import React, { useState, useRef, useEffect } from 'react';
import { getBotReply, extractEntities, classifyIntent } from '../lib/botBrain';
import { answerFromNotes, isTopicQuestion, tokenize } from '../lib/notesRag';

// No "Who created you?" chip — the answer is correct when asked, but it is
// not advertised (humble credit lives in the footer line below instead).
const QUICK_REPLIES = ['Find DSA notes', 'PYQ 2024', 'What can you do?'];

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
      text: 'Hi! I find notes and PYQ papers — and I can explain a topic from the notes themselves. Try “what is the Carnot cycle?” or “dsa unit 2 sem 4”.',
      results: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const timerRef = useRef(null);

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
      if (isTopicQuestion(text) && intent !== 'founder' && intent !== 'greeting' && intent !== 'thanks') {
        const topic = text
          .replace(/^(what is|what are|what does|explain|define|meaning of|how does|how do|why|tell me about)\s+/i, '')
          .replace(/\?+$/, '').trim();
        const rag = await answerFromNotes(text);
        if (rag.status === 'ok') {
          const lines = rag.hits.map(
            (h) => `**${h.title} — page ${h.page}:**\n${h.excerpt}`,
          );
          reply = `Here's what your notes say about **${topic || text}**:\n\n${lines.join('\n\n')}\n\nTap a note below to open that page.`;
          results = rag.hits.map((h) => ({ ...h, page: h.page }));
        } else if (rag.status === 'no-index') {
          reply = 'The notes are still being converted into a searchable index, so I can only find notes by title right now — try “dsa unit 3 sem 4”. Topic answers switch on automatically once the conversion finishes.';
          results = (rag.candidates || []).slice(0, 3);
        } else {
          const entities = extractEntities(text);
          const subject = entities.subject ? ` on **${entities.subject}**` : '';
          reply = `I searched your notes${subject} and couldn't find anything about “${topic || text}”. The notes may not cover it yet — try rephrasing, or open the closest notes below.`;
          results = (rag.candidates || []).slice(0, 3);
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
                        <small>{r.semesterName} · {r.subject}{r.page ? ` · page ${r.page}` : ''}</small>
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
          placeholder="Ask for notes… e.g. what is the Carnot cycle?"
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
