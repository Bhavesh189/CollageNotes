// My Study — the reader's home: streak, goals, continue reading, revision
// queue, stats, achievements, exam plan, syllabus tracker, settings + data.
// Everything is local (src/lib/study.js); nothing leaves the device.
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  getStats, getContinueReading, getOnThisDay, getRevisionDue, getAchievements,
  getStreak, getGoal, setGoal, getExam, setExam, daysUntilExam, buildExamPlan,
  getSyllabusTicks, toggleSyllabusUnit, deriveUnits, getSettings, setSettings,
  exportAllData, importAllData, resetAllData, markRevise, markDone,
  getWeeklyReport, getPersonalRecords, getNoteRequests, getFrequentlyTogether,
} from '../lib/study';
import { semestersData } from '../data/notesData';

function useStudy() {
  const [, setTick] = useState(0);
  useEffect(() => {
    const refresh = () => setTick((t) => t + 1);
    window.addEventListener('bn-study-changed', refresh);
    return () => window.removeEventListener('bn-study-changed', refresh);
  }, []);
}

function Ring({ value, max, size = 92, label, sub }) {
  const r = 40;
  const c = 2 * Math.PI * r;
  const pct = max > 0 ? Math.min(1, value / max) : 0;
  return (
    <div className="study-ring" style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size}>
        <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(27,122,67,0.15)" strokeWidth="9" />
        <circle
          cx="50" cy="50" r={r} fill="none" stroke="var(--green)" strokeWidth="9"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct)}
          transform="rotate(-90 50 50)"
        />
      </svg>
      <div className="study-ring-text">
        <strong>{label}</strong>
        {sub && <span>{sub}</span>}
      </div>
    </div>
  );
}

export default function MyStudy({ currentSem, onOpenNote, onNavigate }) {
  useStudy();
  const stats = useMemo(() => getStats(), []);
  const cont = useMemo(() => getContinueReading(4), []);
  const otd = useMemo(() => getOnThisDay(), []);
  const due = useMemo(() => getRevisionDue(), []);
  const achievements = useMemo(() => getAchievements(), []);
  const goal = getGoal();
  const exam = getExam();
  const daysLeft = daysUntilExam();
  const settings = getSettings();
  const streak = getStreak();
  const [examDate, setExamDate] = useState(exam.date || '');
  const [examLabel, setExamLabel] = useState(exam.label || 'Endsem');
  const [plan, setPlan] = useState(null);
  const [goalPages, setGoalPages] = useState(goal.pages);
  const [goalMins, setGoalMins] = useState(goal.minutes);
  const [trackSem, setTrackSem] = useState(currentSem);
  const [exportMsg, setExportMsg] = useState('');
  const fileRef = useRef(null);

  // Pomodoro (25/5) — a completed focus session logs 25 min to the streak.
  const [pomo, setPomo] = useState({ mode: 'focus', secs: 25 * 60, running: false });
  useEffect(() => {
    if (!pomo.running) return undefined;
    const t = setInterval(() => {
      setPomo((p) => {
        if (p.secs <= 1) {
          clearInterval(t);
          if (p.mode === 'focus') {
            try {
              const s = JSON.parse(localStorage.getItem('bn-streak') || '{"days":{}}');
              const today = new Date();
              const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
              s.days[key] = (s.days[key] || 0) + 25;
              localStorage.setItem('bn-streak', JSON.stringify(s));
              window.dispatchEvent(new CustomEvent('bn-study-changed'));
            } catch { /* ignore */ }
          }
          return { mode: p.mode === 'focus' ? 'break' : 'focus', secs: p.mode === 'focus' ? 5 * 60 : 25 * 60, running: false };
        }
        return { ...p, secs: p.secs - 1 };
      });
    }, 1000);
    return () => clearInterval(t);
  }, [pomo.running, pomo.mode]);
  const pomoLabel = `${String(Math.floor(pomo.secs / 60)).padStart(2, '0')}:${String(pomo.secs % 60).padStart(2, '0')}`;

  const level = Math.floor(stats.pagesRead / 50) + 1;
  const xp = stats.pagesRead % 50;
  const semData = semestersData[trackSem] || semestersData.sem1;
  const allUnread = useMemo(() => {
    const out = [];
    for (const sem of Object.values(semestersData)) {
      for (const sub of sem.subjects || []) {
        for (const n of sub.notes || []) {
          const p = (JSON.parse(localStorage.getItem('bn-progress') || '{}'))[n.file];
          if (!p || !p.done) out.push({ ...n, subject: sub.name, sem: sem.name });
        }
      }
    }
    return out.slice(0, 60);
  }, []);

  const openItem = (it) => {
    onOpenNote(it.file, it.title, { semester: it.sem || semData.name, source: it.type === 'pyq' ? 'pyq' : 'notes' });
  };

  const saveExam = () => {
    if (!examDate) return;
    setExam(examDate, examLabel.trim() || 'Endsem');
  };

  const makePlan = () => setPlan(buildExamPlan(allUnread));

  const doExport = () => {
    const blob = new Blob([JSON.stringify(exportAllData(), null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'collagenotes-my-data.json';
    a.click();
    URL.revokeObjectURL(a.href);
    setExportMsg('Exported — your data is in collagenotes-my-data.json.');
  };

  const doImport = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      try {
        const ok = importAllData(JSON.parse(String(r.result)));
        setExportMsg(ok ? 'Imported — your progress is restored.' : 'That file does not look like CollageNotes data.');
      } catch {
        setExportMsg('Could not read that file — is it a CollageNotes export?');
      }
    };
    r.readAsText(f);
    e.target.value = '';
  };

  const maxBar = Math.max(1, ...stats.daily.map((d) => d.mins));
  const weekly = useMemo(() => getWeeklyReport(), []);
  const records = useMemo(() => getPersonalRecords(), []);
  const requests = useMemo(() => getNoteRequests(), []);
  const [shareMsg, setShareMsg] = useState('');

  const shareText = async (text) => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Bhavesh Notes', text });
        return;
      } catch {
        // cancelled — fall through to copy
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      setShareMsg('Copied — paste it anywhere.');
      setTimeout(() => setShareMsg(''), 3000);
    } catch {
      setShareMsg(text);
    }
  };

  const shareProgress = () => {
    const s = getStats();
    const st = getStreak();
    shareText(
      `My Bhavesh Notes progress: ${s.notesDone} notes done, ${s.pagesRead} pages read, ${s.minutes} min studying, ${st.current}-day streak. Free B.Tech CSE notes at notes.thebhavesh.online`,
    );
  };

  const sharePlan = () => {
    const due = getRevisionDue();
    const lines = due.slice(0, 8).map((d) => `• ${d.title}`).join('\n');
    shareText(`My revision plan (${due.length} due):\n${lines || 'Nothing due — all caught up!'}\n— Bhavesh Notes`);
  };

  return (
    <div className="study-page">
      <div className="study-head">
        <div>
          <h2 className="panel-title"><i className="fa-solid fa-graduation-cap"></i> My Study</h2>
          <p className="study-sub">Your reading, streaks and revision plan — stored only on this device.</p>
        </div>
        <div className="study-streak-chip" title={`Best streak: ${streak.best} days${streak.freezeUsed ? ' (rest-day freeze used this week)' : ''}`}>
          <i className="fa-solid fa-fire"></i> {streak.current}-day streak
          {streak.freezeUsed && <span className="study-freeze">· freeze used</span>}
        </div>
      </div>

      {/* Today + level */}
      <div className="study-cards">
        <div className="study-card glass">
          <h3>Today</h3>
          <div className="study-today-row">
            <Ring value={streak.todayMins} max={goal.minutes} label={`${streak.todayMins}m`} sub={`of ${goal.minutes}m`} />
            <div className="study-today-text">
              <p><strong>{stats.notesRead}</strong> notes opened · <strong>{stats.pagesRead}</strong> pages read</p>
              <label className="study-goal-label">
                Daily goal: <input type="number" min="1" max="240" value={goalMins} onChange={(e) => setGoalMins(Number(e.target.value) || 30)} /> min · <input type="number" min="1" max="200" value={goalPages} onChange={(e) => setGoalPages(Number(e.target.value) || 20)} /> pages
                <button type="button" className="study-mini-btn" onClick={() => setGoal(goalPages, goalMins)}>Save</button>
              </label>
            </div>
          </div>
        </div>
        <div className="study-card glass">
          <h3>Level {level} — Reader</h3>
          <p className="study-xp-text">Every page read earns XP. {xp}/50 XP to level {level + 1}.</p>
          <div className="study-xp-bar"><div style={{ width: `${(xp / 50) * 100}%` }} /></div>
          <p className="study-xp-text">Total: {stats.minutes} min · {stats.pagesRead} pages · {stats.pyqDownloads} PYQs downloaded</p>
        </div>
        <div className="study-card glass">
          <h3><i className="fa-solid fa-stopwatch"></i> Pomodoro</h3>
          <p className="study-pomo-time">{pomoLabel}</p>
          <p className="study-xp-text">{pomo.mode === 'focus' ? 'Focus — 25 min, then a 5-min break.' : 'Break — 5 min. A finished focus session logs 25 min.'}</p>
          <div className="study-btn-row">
            <button type="button" className="study-mini-btn" onClick={() => setPomo((p) => ({ ...p, running: !p.running }))}>{pomo.running ? 'Pause' : 'Start'}</button>
            <button type="button" className="study-mini-btn" onClick={() => setPomo({ mode: 'focus', secs: 25 * 60, running: false })}>Reset</button>
          </div>
        </div>
      </div>

      {/* Continue reading */}
      <div className="study-section">
        <h3><i className="fa-solid fa-book-open"></i> Continue reading</h3>
        {cont.length === 0 ? (
          <p className="study-empty">Nothing in progress yet — open any note and it will show up here with the exact page you left.</p>
        ) : (
          <div className="study-list">
            {cont.map((it) => (
              <div key={it.file} className="study-row glass">
                <div className="study-row-main">
                  <strong>{it.title}</strong>
                  <span>{it.subject}{it.sem ? ` · ${it.sem}` : ''} · page {it.lastPage}{it.total ? ` of ${it.total}` : ''}</span>
                  <div className="study-progress"><div style={{ width: `${it.pct}%` }} /></div>
                </div>
                <div className="study-btn-row">
                  <button type="button" className="study-mini-btn primary" onClick={() => openItem(it)}>Resume p.{it.lastPage}</button>
                  <button type="button" className="study-mini-btn" onClick={() => markDone(it.file, true, { title: it.title, subject: it.subject, sem: it.sem })}>Mark done</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Revision due + On this day */}
      <div className="study-two-col">
        <div className="study-section">
          <h3><i className="fa-solid fa-rotate-left"></i> Revision due</h3>
          {due.length === 0 ? (
            <p className="study-empty">Nothing due. Mark a note “Revise” and it reappears after 1, 3, then 7 days.</p>
          ) : (
            <div className="study-list">
              {due.map((it) => (
                <div key={it.file} className="study-row glass">
                  <div className="study-row-main">
                    <strong>{it.title}</strong>
                    <span>{it.subject} · {it.nextReview === 'flagged' ? 'flagged for revision' : `due ${it.nextReview}`}</span>
                  </div>
                  <button type="button" className="study-mini-btn primary" onClick={() => openItem(it)}>Review</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="study-section">
          <h3><i className="fa-solid fa-calendar-day"></i> On this day</h3>
          {(otd.week.length === 0 && otd.month.length === 0) ? (
            <p className="study-empty">What you read 7 or 30 days ago will resurface here for spaced recall.</p>
          ) : (
            <>
              {otd.week.length > 0 && <p className="study-otd-label">7 days ago</p>}
              {otd.week.map((it) => (
                <div key={it.file} className="study-row glass"><div className="study-row-main"><strong>{it.title}</strong><span>{it.subject}</span></div><button type="button" className="study-mini-btn" onClick={() => openItem(it)}>Re-read</button></div>
              ))}
              {otd.month.length > 0 && <p className="study-otd-label">30 days ago</p>}
              {otd.month.map((it) => (
                <div key={it.file} className="study-row glass"><div className="study-row-main"><strong>{it.title}</strong><span>{it.subject}</span></div><button type="button" className="study-mini-btn" onClick={() => openItem(it)}>Re-read</button></div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Stats + weekly bars + per-subject */}
      <div className="study-section">
        <h3><i className="fa-solid fa-chart-simple"></i> Stats</h3>
        <div className="study-stat-grid">
          <div className="study-stat glass"><strong>{stats.notesRead}</strong><span>notes opened</span></div>
          <div className="study-stat glass"><strong>{stats.notesDone}</strong><span>notes done</span></div>
          <div className="study-stat glass"><strong>{stats.pagesRead}</strong><span>pages read</span></div>
          <div className="study-stat glass"><strong>{Math.floor(stats.minutes / 60)}h {stats.minutes % 60}m</strong><span>total reading</span></div>
          <div className="study-stat glass"><strong>{stats.pyqDownloads}</strong><span>PYQs downloaded</span></div>
          <div className="study-stat glass"><strong>{streak.best}</strong><span>best streak (days)</span></div>
        </div>
        <div className="study-bars">
          <div className="study-week">
            <p className="study-otd-label">Minutes per day — last 7 days (this week {stats.weekNow}m vs last week {stats.weekPrev}m)</p>
            <div className="study-bar-row">
              {stats.daily.map((d) => (
                <div key={d.day} className="study-bar-col" title={`${d.day}: ${d.mins} min`}>
                  <div className="study-bar" style={{ height: `${Math.max(4, (d.mins / maxBar) * 64)}px` }} />
                  <span>{d.day.slice(5)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="study-subjects">
            <p className="study-otd-label">Per-subject progress</p>
            {Object.entries(stats.perSubject).slice(0, 8).map(([name, s]) => (
              <div key={name} className="study-subj-row">
                <span>{name}</span>
                <div className="study-progress"><div style={{ width: `${s.total ? Math.round((s.done / s.total) * 100) : 0}%` }} /></div>
                <span>{s.done}/{s.total} done</span>
              </div>
            ))}
            {Object.keys(stats.perSubject).length === 0 && <p className="study-empty">Open a note to start your first bar.</p>}
          </div>
        </div>
        <div className="study-weekly">
          <div className="study-weekly-card glass">
            <h4><i className="fa-solid fa-calendar-week"></i> This week</h4>
            <p><strong>{weekly.weekNow}m</strong> reading (last week {weekly.weekPrev}m) · <strong>{weekly.notes}</strong> notes opened · <strong>{weekly.pages}</strong> pages</p>
          </div>
          <div className="study-weekly-card glass">
            <h4><i className="fa-solid fa-trophy"></i> Personal records</h4>
            <p>
              {records.mostPagesDay ? <>Most pages in a day: <strong>{records.mostPagesDay.pages}</strong> ({records.mostPagesDay.day}) · </> : 'No records yet — '}
              Longest day: <strong>{records.longestSessionMins}m</strong>
              {records.earliest ? <> · Earliest: <strong>{records.earliest}</strong></> : ''}
              {records.latest ? <> · Latest: <strong>{records.latest}</strong></> : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Share */}
      <div className="study-section">
        <h3><i className="fa-solid fa-share-nodes"></i> Share</h3>
        <div className="study-settings glass">
          <div className="study-btn-row" style={{ flexWrap: 'wrap' }}>
            <button type="button" className="study-mini-btn primary" onClick={shareProgress}>Share my progress</button>
            <button type="button" className="study-mini-btn" onClick={sharePlan}>Share my revision plan</button>
            <button
              type="button"
              className="study-mini-btn"
              onClick={() => {
                const url = `${window.location.origin}${window.location.pathname}#${currentSem || 'sem3'}`;
                shareText(`Free B.Tech CSE notes, syllabus & PYQs — Bhavesh Notes: ${url}`);
              }}
            >
              Invite a friend
            </button>
            <a
              className="study-mini-btn"
              href={`https://wa.me/?text=${encodeURIComponent(`Free B.Tech CSE notes — Bhavesh Notes: ${window.location.origin}`)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Send to myself (WhatsApp)
            </a>
          </div>
          {shareMsg && <p className="study-export-msg">{shareMsg}</p>}
          {requests.length > 0 && (
            <p className="study-empty">Notes you requested: {requests.map((r) => r.text).join(' · ')}</p>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="study-section">
        <h3><i className="fa-solid fa-trophy"></i> Achievements</h3>
        <div className="study-badges">
          {achievements.map((a) => (
            <div key={a.id} className={`study-badge glass ${a.unlocked ? 'unlocked' : 'locked'}`} title={a.desc}>
              <i className={`fa-solid ${a.unlocked ? 'fa-medal' : 'fa-lock'}`}></i>
              <strong>{a.name}</strong>
              <span>{a.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Exam countdown + plan */}
      <div className="study-section">
        <h3><i className="fa-solid fa-hourglass-half"></i> Exam countdown</h3>
        <div className="study-exam glass">
          <div className="study-exam-form">
            <label>Exam <input type="text" value={examLabel} onChange={(e) => setExamLabel(e.target.value)} placeholder="Endsem" /></label>
            <label>Date <input type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} /></label>
            <button type="button" className="study-mini-btn primary" onClick={saveExam}>Save</button>
          </div>
          {daysLeft !== null && (
            <p className="study-exam-count">{exam.label} in <strong>{daysLeft} day{daysLeft === 1 ? '' : 's'}</strong> · {allUnread.length} unread notes</p>
          )}
          {daysLeft !== null && daysLeft > 0 && (
            <button type="button" className="study-mini-btn primary" onClick={makePlan}>Make my day-by-day plan</button>
          )}
          {plan && plan.length > 0 && (
            <div className="study-plan">
              {plan.map((d) => (
                <div key={d.date} className="study-plan-day">
                  <strong>{d.date}</strong>
                  <ul>{d.notes.map((n) => <li key={n.file}>{n.title} <span>({n.subject})</span></li>)}</ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Syllabus tracker */}
      <div className="study-section">
        <h3><i className="fa-solid fa-list-check"></i> Syllabus tracker</h3>
        <div className="study-sem-pills">
          {Object.values(semestersData).map((s) => (
            <button key={s.id} type="button" className={`study-pill ${trackSem === s.id ? 'active' : ''}`} onClick={() => setTrackSem(s.id)}>{s.name}</button>
          ))}
        </div>
        <div className="study-track-grid">
          {(semData.subjects || []).map((sub) => {
            const units = deriveUnits(sub.notes);
            const ticks = getSyllabusTicks(sub.id);
            const unitNames = Object.keys(units);
            const doneUnits = unitNames.filter((u) => ticks[u]).length;
            const pct = unitNames.length ? Math.round((doneUnits / unitNames.length) * 100) : 0;
            return (
              <div key={sub.id} className="study-track-card glass">
                <div className="study-track-head"><strong>{sub.name}</strong><span>{pct}%</span></div>
                <div className="study-progress"><div style={{ width: `${pct}%` }} /></div>
                {unitNames.map((u) => (
                  <label key={u} className="study-tick">
                    <input
                      type="checkbox" checked={!!ticks[u]}
                      onChange={() => toggleSyllabusUnit(sub.id, u, units[u])}
                    />
                    {u} <span>({units[u].length} note{units[u].length === 1 ? '' : 's'})</span>
                  </label>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Settings + data */}
      <div className="study-section">
        <h3><i className="fa-solid fa-gear"></i> Settings &amp; your data</h3>
        <div className="study-settings glass">
          <div className="study-setting-row">
            <span>UI text size</span>
            <div className="study-seg">
              {['s', 'm', 'l', 'xl'].map((s) => (
                <button key={s} type="button" className={settings.fontSize === s ? 'active' : ''} onClick={() => setSettings({ fontSize: s })}>{s.toUpperCase()}</button>
              ))}
            </div>
          </div>
          <label className="study-setting-row"><span>Reduce motion (calmer animations)</span><input type="checkbox" checked={settings.reduceMotion} onChange={(e) => setSettings({ reduceMotion: e.target.checked })} /></label>
          <label className="study-setting-row"><span>High contrast (stronger borders &amp; text)</span><input type="checkbox" checked={settings.highContrast} onChange={(e) => setSettings({ highContrast: e.target.checked })} /></label>
          <label className="study-setting-row"><span>Dyslexia-friendly font (Lexend) for UI text</span><input type="checkbox" checked={settings.dyslexiaFont} onChange={(e) => setSettings({ dyslexiaFont: e.target.checked })} /></label>
          <label className="study-setting-row">
            <span>Line height ({settings.lineHeight.toFixed(1)})</span>
            <input type="range" min="1.3" max="2" step="0.1" value={settings.lineHeight} aria-label="Line height" onChange={(e) => setSettings({ lineHeight: Number(e.target.value) })} />
          </label>
          <label className="study-setting-row">
            <span>Letter spacing ({settings.letterSpacing.toFixed(2)}em)</span>
            <input type="range" min="0" max="0.08" step="0.01" value={settings.letterSpacing} aria-label="Letter spacing" onChange={(e) => setSettings({ letterSpacing: Number(e.target.value) })} />
          </label>
          <label className="study-setting-row"><span>Vibrate on bookmark / done / page-turn (mobile)</span><input type="checkbox" checked={settings.haptics} onChange={(e) => setSettings({ haptics: e.target.checked })} /></label>
          <label className="study-setting-row"><span>Low-data mode (don’t preload next pages)</span><input type="checkbox" checked={settings.lowData} onChange={(e) => setSettings({ lowData: e.target.checked })} /></label>
          <div className="study-setting-row">
            <span>Default viewer fit</span>
            <div className="study-seg">
              {['width', 'page', 'height'].map((f) => (
                <button key={f} type="button" className={settings.defaultFit === f ? 'active' : ''} onClick={() => setSettings({ defaultFit: f })}>{f}</button>
              ))}
            </div>
          </div>
          <div className="study-data-row">
            <button type="button" className="study-mini-btn" onClick={doExport}>Export my data (JSON)</button>
            <button type="button" className="study-mini-btn" onClick={() => fileRef.current && fileRef.current.click()}>Import data</button>
            <input ref={fileRef} type="file" accept="application/json" style={{ display: 'none' }} onChange={doImport} />
            <button type="button" className="study-mini-btn danger" onClick={() => { if (window.confirm('Delete ALL progress, bookmarks, collections and settings on this device?')) resetAllData(); }}>Reset everything</button>
          </div>
          {exportMsg && <p className="study-export-msg">{exportMsg}</p>}
          <p className="study-empty">Shortcuts: <strong>Ctrl/⌘+K</strong> jump to anything · <strong>/</strong> search · <strong>?</strong> all shortcuts · <strong>F</strong> fullscreen in the viewer · <strong>←</strong> <strong>→</strong> change page.</p>
        </div>
      </div>

      <div className="study-foot">
        <button type="button" className="study-mini-btn" onClick={() => onNavigate('notes')}>← Back to notes</button>
      </div>
    </div>
  );
}
