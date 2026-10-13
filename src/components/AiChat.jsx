import React, { useState, useRef, useEffect } from 'react';
import { getBotReply } from '../lib/botBrain';

const QUICK_REPLIES = ['Find DSA notes', 'PYQ 2024', 'Who created you?'];

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
      text: 'Hi! I can find notes and PYQ papers for you. Try “aem chapter 1 sem 3”.',
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
    timerRef.current = setTimeout(() => {
      const { reply, results } = getBotReply(text);
      setTyping(false);
      setMessages((m) => [...m, { from: 'bot', text: reply, results: results || [] }]);
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
                      onClick={() => onPreview && onPreview(r.file, `${r.title} — ${r.subject}`)}
                    >
                      <span className={`result-badge ${r.type === 'pyq' ? 'badge-pyq' : 'badge-note'}`}>
                        {r.type === 'pyq' ? 'PYQ' : 'Note'}
                      </span>
                      <span className="aichat-result-text">
                        <strong>{r.title}</strong>
                        <small>{r.semesterName} · {r.subject}</small>
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
          placeholder="Ask for notes… e.g. dsa unit 2 sem 4"
          aria-label="Chat message"
          autoComplete="off"
        />
        <button className="aichat-send" type="submit" aria-label="Send message">
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
};

export default AiChat;
