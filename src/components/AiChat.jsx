import React, { useState, useRef, useEffect } from 'react';
import { getBotReply, extractEntities, classifyIntent } from '../lib/botBrain';
import { answerFromNotes, isTopicQuestion, tokenize, isFollowUp, followUpKind } from '../lib/notesRag';

// No "Who created you?" chip — the answer is correct when asked, but it is
// not advertised (humble credit lives in the footer line below instead).
const QUICK_REPLIES = ['DSA notes dhoondo', 'PYQ 2024', 'Tum kya kar sakte ho?'];

/** Semester the student is currently viewing, from the URL hash (#sem4).
 * Used as a ranking context — answers from the viewed semester rank higher.
 * Read at send time (the hash changes as the student browses). */
function semesterFromHash() {
  try {
    const m = String(window.location.hash || '').match(/sem\s*-?\s*([1-8])/i);
    return m ? `sem${m[1]}` : null;
  } catch {
    return null;
  }
}

// Renders **bold** spans in bot text (founder answer uses markdown-ish bold)
function renderRich(text) {
  const parts = String(text).split('**');
  return parts.map((p, i) =>
    i % 2 === 1 ? <strong key={i}>{p}</strong> : <span key={i}>{p}</span>
  );
}

const AiChat = ({ onPreview }) => {
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Namaste! Main notes aur PYQ dhoondhta hoon — aur kisi topic ko notes se samjha bhi sakta hoon. Try karo: “Carnot cycle kya hai?” ya “dsa unit 2 sem 4”.',
      results: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [expandedExtra, setExpandedExtra] = useState(new Set());
  const bottomRef = useRef(null);
  const timerRef = useRef(null);
  // Conversation memory (last topic only, capped): follow-ups like "aur
  // batao" / "iska example do" resolve against the previous topic instead
  // of failing or starting over. `shown` tracks pages already quoted so a
  // follow-up shows the NEXT best pages, not the same ones.
  const ctxRef = useRef({ topic: null, questionType: null, shown: new Set(), turns: 0 });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, typing]);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const send = (raw) => {
    const text = String(raw || '').trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { from: 'user', text, results: [] }]);
    setInput('');
    setTyping(true);
    // Grounded answers: topic questions are answered from the notes' own
    // text (notesRag). Everything else uses the title-based brain. The
    // reply is never invented — a miss says so honestly.
    timerRef.current = setTimeout(async () => {
      let reply;
      let results = [];
      const intent = classifyIntent(text);
      const semester = semesterFromHash();
      // Follow-ups ("aur batao", "iska example do") resolve against the
      // last topic instead of being searched from scratch.
      let question = text;
      let followUp = null;
      if (isFollowUp(text) && ctxRef.current.topic) {
        const kind = followUpKind(text);
        followUp = kind;
        question = kind === 'example'
          ? `${ctxRef.current.topic} example`
          : kind === 'steps'
            ? `${ctxRef.current.topic} steps`
            : ctxRef.current.topic;
      }
      // A bare topic phrase ("carnot cycel", "normalisation") has no
      // question words but is still a topic question — route it to RAG
      // unless the intent is clearly a lookup or small-talk.
      const topicLike = isTopicQuestion(question)
        || intent === 'fallback'
        || followUp !== null;
      if (topicLike && intent !== 'founder' && intent !== 'greeting' && intent !== 'thanks') {
        const topic = question
          .replace(/^(what is|what are|what does|explain|define|meaning of|how does|how do|why|tell me about|kya hai|kya hota hai|kaise|samjhao|matlab|batao)\s+/i, '')
          .replace(/\?+$/, '').trim();
        const exclude = followUp === 'more' ? ctxRef.current.shown : null;
        const rag = await answerFromNotes(question, { semester, exclude });
        if (rag.status === 'ok') {
          ctxRef.current = {
            topic: rag.topic || topic || text,
            questionType: rag.questionType || null,
            shown: new Set([
              ...ctxRef.current.shown,
              ...rag.hits.map((h) => `${h.file}|${h.page}`),
            ]),
            turns: Math.min(ctxRef.current.turns + 1, 3),
          };
          const correctedNote = (rag.corrected && rag.corrected.length > 0)
            ? `\n(Tumne “${rag.corrected[0].from}” likha tha — maine “${rag.corrected[0].to}” samjha.)`
            : '';
          let lines;
          if (rag.questionType === 'difference' && rag.difference) {
            lines = rag.difference.map(
              (d) => `**${d.label}:**\n${d.excerpt}`,
            );
          } else {
            lines = rag.hits.map(
              (h) => `**${h.title} — page ${h.page}:**\n${h.excerpt}`,
            );
          }
          reply = `Short me: ${rag.synthesis}\n\nNotes me is baare me ye likha hai:\n\n${lines.join('\n\n')}\n\nNeeche wale note pe tap karke us page ko kholo.${correctedNote}`;
          results = rag.hits.map((h) => ({ ...h, page: h.page }));
          const extra = rag.hits.filter((h) => h.excerptMore).map((h) => ({ title: h.title, page: h.page, text: h.excerptMore }));
          const followUps = rag.followUps || [];
          setTyping(false);
          setMessages((m) => [...m, { from: 'bot', text: reply, results, extra, followUps }]);
          return;
        } else if (rag.status === 'no-index') {
          reply = 'Notes abhi searchable index me convert ho rahe hain, isliye main abhi sirf title se notes dhoondh sakta hoon — try karo “dsa unit 3 sem 4”. Conversion complete hote hi topic wale jawab apne aap on ho jayenge.';
          results = (rag.candidates || []).slice(0, 3);
        } else {
          const entities = extractEntities(text);
          const subject = entities.subject ? ` **${entities.subject}** pe` : '';
          // Only point at "closest notes" when there actually are some —
          // otherwise the line promises cards that never appear.
          const cands = (rag.candidates || []).slice(0, 3);
          if (followUp) {
            reply = `Is topic pe notes me aur kuch nahi mila — jo tha wo upar dikha diya. ${cands.length > 0 ? 'Koi aur topic poochho, ya neeche closest notes dekho.' : 'Koi aur topic poochho.'}`;
          } else {
            reply = `Maine notes me${subject} “${topic || text}” ke baare me kuch nahi paya. Ho sakta hai ye topic notes me cover hi na hua ho — spelling check karke dobara try karo${cands.length > 0 ? ', ya neeche closest notes dekho.' : '.'}`;
          }
          results = cands;
        }
      } else {
        const out = getBotReply(text);
        reply = out.reply;
        results = out.results || [];
      }
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: reply, results }]);
    }, 650);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  return (
    <div className="aichat">
      <div className="aichat-messages" role="log" aria-live="polite">
        {messages.map((msg, i) => (
          <div key={i} className={`aichat-msg ${msg.from === 'bot' ? 'bot' : 'user'}`}>
            <div className="aichat-bubble">
              <span style={{ whiteSpace: 'pre-line' }}>{renderRich(msg.text)}</span>
              {msg.extra && msg.extra.length > 0 && (
                <div className="aichat-extra">
                  {expandedExtra.has(i) ? (
                    <>
                      {msg.extra.map((x, xi) => (
                        <p key={xi} className="aichat-extra-text" style={{ whiteSpace: 'pre-line' }}>
                          <strong>{x.title} — page {x.page} (continued):</strong> {renderRich(x.text)}
                        </p>
                      ))}
                      <button type="button" className="aichat-more-btn" onClick={() => setExpandedExtra((s) => { const n = new Set(s); n.delete(i); return n; })}>
                        Show less
                      </button>
                    </>
                  ) : (
                    <button type="button" className="aichat-more-btn" onClick={() => setExpandedExtra((s) => new Set(s).add(i))}>
                      In pages se aur dikhao ({msg.extra.length})
                    </button>
                  )}
                </div>
              )}
              {msg.followUps && msg.followUps.length > 0 && (
                <div className="aichat-followups">
                  <span>Aage badho:</span>
                  {msg.followUps.map((f, fi) => (
                    <button key={fi} type="button" className="aichat-followup-chip" onClick={() => send(f)}>
                      {f}
                    </button>
                  ))}
                </div>
              )}
              {msg.results && msg.results.length > 0 && (
                <div className="aichat-results">
                  {msg.results.map((r, ri) => (
                    <button
                      key={ri}
                      type="button"
                      className="aichat-result"
                      onClick={() => onPreview && onPreview(r.file, `${r.title} — ${r.subject}`, r.page, r.type)}
                    >
                      <span className={`result-badge ${r.type === 'pyq' ? 'badge-pyq' : 'badge-note'}`}>
                        {r.type === 'pyq' ? 'PYQ' : 'Note'}
                      </span>
                      <span className="aichat-result-text">
                        <strong>{r.title}</strong>
                        <small>{[r.semesterName, r.subject, r.page ? `page ${r.page}` : ''].filter(Boolean).join(' · ')}</small>
                      </span>
                      <i className="fa-solid fa-eye"></i>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="aichat-msg bot">
            <div className="aichat-bubble aichat-typing">
              <span></span><span></span><span></span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="aichat-chips">
        {QUICK_REPLIES.map((q) => (
          <button key={q} type="button" className="aichat-chip" onClick={() => send(q)}>
            {q}
          </button>
        ))}
      </div>

      <form className="aichat-inputrow" onSubmit={onSubmit}>
        <input
          className="form-input aichat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Sawaal likho… e.g. Carnot cycle kya hai?"
          aria-label="Chat message"
          autoComplete="off"
        />
        <button className="aichat-send" type="submit" aria-label="Send message">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
      <p className="aichat-credit">Answers come from your notes — quoted with the page they are on. Made by Bhavesh Sharma.</p>
    </div>
  );
};

export default AiChat;
