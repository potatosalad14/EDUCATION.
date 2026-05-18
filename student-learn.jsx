/* global React, Icon */
const { useState, useEffect, useMemo } = React;

/* ============ Lesson Reader ============ */
const LessonReader = ({ subjectId, lessonId, navigate, progress, markLessonDone }) => {
  const subject = window.SUBJECTS.find(s => s.id === subjectId);
  const lesson = subject?.lessons.find(l => l.id === lessonId);
  const idx = subject?.lessons.findIndex(l => l.id === lessonId) ?? -1;
  if (!lesson) return <div>Урок не найден</div>;
  const next = subject.lessons[idx + 1];
  const prev = subject.lessons[idx - 1];

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 16 }}>
        <button className="btn ghost sm" onClick={() => navigate({ page: "subject", subjectId })}>
          <Icon name="arrowL" size={14} /> К курсу: {subject.name}
        </button>
      </div>

      <div className="lesson-shell">
        <div className="toc">
          <h4>Уроки курса</h4>
          {subject.lessons.map((l, i) => {
            const done = !!(progress.lessons || {})[l.id];
            const active = l.id === lessonId;
            return (
              <div key={l.id}
                className={"toc-item " + (active ? "active " : "") + (done ? "done" : "")}
                onClick={() => navigate({ page: "lesson", subjectId, lessonId: l.id })}>
                <div className="dot">{done ? "✓" : i + 1}</div>
                <div style={{ flex: 1 }}>{l.title}</div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="reader">
            <h1>{lesson.title}</h1>
            <div className="meta">
              <span><Icon name="clock" size={13} /> {lesson.duration} мин</span>
              <span>{subject.name}</span>
            </div>
            {lesson.body.map((b, i) => {
              if (b.type === "p") return <p key={i}>{b.text}</p>;
              if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
              if (b.type === "callout") return <div key={i} className="callout">{b.text}</div>;
              if (b.type === "formula") return <div key={i} className="formula">{b.text}</div>;
              if (b.type === "code") return <pre key={i}>{b.text}</pre>;
              if (b.type === "ul") return <ul key={i}>{b.items.map((it, j) => <li key={j}>{it}</li>)}</ul>;
              return null;
            })}
          </div>

          <div className="lesson-foot">
            <button className="btn ghost" disabled={!prev}
              onClick={() => prev && navigate({ page: "lesson", subjectId, lessonId: prev.id })}>
              <Icon name="arrowL" size={14} /> {prev ? prev.title : "Предыдущий"}
            </button>
            <button className="btn primary" onClick={() => {
              markLessonDone(lessonId);
              navigate({ page: "quiz", subjectId, lessonId });
            }}>
              Перейти к тесту <Icon name="arrow" size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ Quiz ============ */
const Quiz = ({ subjectId, lessonId, navigate, saveTestResult }) => {
  const subject = window.SUBJECTS.find(s => s.id === subjectId);
  const lesson = subject?.lessons.find(l => l.id === lessonId);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);

  if (!lesson) return <div>Тест не найден</div>;
  const q = lesson.quiz[current];
  const total = lesson.quiz.length;

  const setAns = (val) => setAnswers({ ...answers, [current]: val });

  const finish = () => {
    let correct = 0;
    lesson.quiz.forEach((qu, i) => {
      const a = answers[i];
      if (qu.type === "single" && a === qu.correct) correct++;
      else if (qu.type === "multi") {
        const arr = Array.isArray(a) ? a : [];
        if (arr.length === qu.correct.length && arr.every(x => qu.correct.includes(x))) correct++;
      }
      else if (qu.type === "input") {
        if (a && String(a).trim().toLowerCase() === String(qu.correct).toLowerCase()) correct++;
      }
      else if (qu.type === "match") {
        if (a && qu.pairs.every((p, j) => a[j] === j)) correct++;
      }
    });
    const score = Math.round(correct / total * 100);
    saveTestResult(lessonId, { score, correct, total, when: Date.now(), subjectId });
    setDone(true);
  };

  if (done) {
    let correct = 0;
    lesson.quiz.forEach((qu, i) => {
      const a = answers[i];
      if (qu.type === "single" && a === qu.correct) correct++;
      else if (qu.type === "multi") {
        const arr = Array.isArray(a) ? a : [];
        if (arr.length === qu.correct.length && arr.every(x => qu.correct.includes(x))) correct++;
      }
      else if (qu.type === "input" && a && String(a).trim().toLowerCase() === String(qu.correct).toLowerCase()) correct++;
      else if (qu.type === "match" && a && qu.pairs.every((p, j) => a[j] === j)) correct++;
    });
    const score = Math.round(correct / total * 100);
    const msg = score >= 90 ? "Отличный результат! 🎉" : score >= 70 ? "Хорошая работа!" : score >= 50 ? "Неплохо, можно лучше" : "Стоит повторить материал";
    return (
      <div className="fade-in">
        <div className="result-card">
          <div className="result-circle" style={{ "--p": score }}>
            <div>
              <div className="pct">{score}%</div>
              <div className="lbl">РЕЗУЛЬТАТ</div>
            </div>
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 800, margin: "0 0 6px" }}>{msg}</h2>
          <div style={{ color: "var(--ink-500)", marginBottom: 22 }}>
            Правильно: {correct} из {total}
          </div>
          <div className="grid-3" style={{ marginBottom: 22 }}>
            <div className="stat-card"><span className="label">Правильно</span><span className="value" style={{ color: "var(--success)" }}>{correct}</span></div>
            <div className="stat-card"><span className="label">Ошибок</span><span className="value" style={{ color: "var(--danger)" }}>{total - correct}</span></div>
            <div className="stat-card"><span className="label">Время</span><span className="value">~{lesson.duration}м</span></div>
          </div>
          <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <button className="btn ghost" onClick={() => navigate({ page: "subject", subjectId })}>К курсу</button>
            <button className="btn primary" onClick={() => { setDone(false); setCurrent(0); setAnswers({}); }}>
              Пройти ещё раз
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in quiz-shell">
      <div style={{ marginBottom: 12 }}>
        <button className="btn ghost sm" onClick={() => navigate({ page: "lesson", subjectId, lessonId })}>
          <Icon name="arrowL" size={14} /> К теории
        </button>
      </div>
      <div className="quiz-head">
        <div>
          <div style={{ fontSize: 13, color: "var(--ink-500)", textTransform: "uppercase", letterSpacing: ".06em", fontWeight: 700 }}>{subject.name} · Тест</div>
          <div style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)" }}>{lesson.title}</div>
        </div>
        <div className="qcount">Вопрос {current + 1} из {total}</div>
      </div>
      <div className="progress" style={{ marginBottom: 22 }}>
        <div className="bar" style={{ width: ((current+1)/total*100) + "%" }} />
      </div>

      <div className="q-card" key={current}>
        <h2>{q.q}</h2>

        {q.type === "single" && (
          <div className="q-options">
            {q.options.map((opt, i) => (
              <button key={i}
                className={"q-option " + (answers[current] === i ? "selected" : "")}
                onClick={() => setAns(i)}>
                <span className="marker">{String.fromCharCode(65+i)}</span>
                {opt}
              </button>
            ))}
          </div>
        )}

        {q.type === "multi" && (
          <div className="q-options">
            {q.options.map((opt, i) => {
              const arr = Array.isArray(answers[current]) ? answers[current] : [];
              const sel = arr.includes(i);
              return (
                <button key={i}
                  className={"q-option " + (sel ? "selected" : "")}
                  onClick={() => setAns(sel ? arr.filter(x => x !== i) : [...arr, i])}>
                  <span className="marker" style={{ borderRadius: 6 }}>{sel ? "✓" : ""}</span>
                  {opt}
                </button>
              );
            })}
            <div style={{ fontSize: 12.5, color: "var(--ink-500)", marginTop: 4 }}>Можно выбрать несколько вариантов</div>
          </div>
        )}

        {q.type === "input" && (
          <div className="q-input-row">
            <input className="input" placeholder="Введите ответ..."
              value={answers[current] || ""}
              onChange={e => setAns(e.target.value)} />
          </div>
        )}

        {q.type === "match" && (
          <MatchQuestion question={q} value={answers[current]} onChange={setAns} />
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 18 }}>
        <button className="btn ghost" disabled={current === 0} onClick={() => setCurrent(current - 1)}>
          <Icon name="arrowL" size={14} /> Назад
        </button>
        {current < total - 1 ? (
          <button className="btn primary" onClick={() => setCurrent(current + 1)}>
            Далее <Icon name="arrow" size={14} />
          </button>
        ) : (
          <button className="btn primary" onClick={finish}>
            Завершить тест <Icon name="check" size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

const MatchQuestion = ({ question, value, onChange }) => {
  // value = { 0: rightIdx, 1: rightIdx, ... } — slot index → assigned right
  const v = value || {};
  const [dragging, setDragging] = useState(null);
  const [overSlot, setOverSlot] = useState(null);

  const used = new Set(Object.values(v));

  const drop = (slotIdx) => {
    if (dragging === null) return;
    // remove dragging from any other slot
    const newV = {};
    Object.entries(v).forEach(([k, val]) => { if (val !== dragging) newV[+k] = val; });
    newV[slotIdx] = dragging;
    onChange(newV);
    setDragging(null);
    setOverSlot(null);
  };

  const remove = (slotIdx) => {
    const newV = { ...v };
    delete newV[slotIdx];
    onChange(newV);
  };

  return (
    <div className="match-area">
      <div className="match-col">
        <h4>Понятия</h4>
        {question.pairs.map((p, i) => (
          <div key={i} className="match-slot has" style={{ borderStyle: "solid", background: "white" }}>
            <span className="match-pair-label">{p.left}</span>
            {v[i] !== undefined ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--indigo-50)", padding: "6px 12px", borderRadius: 8, border: "1.5px solid var(--indigo-500)" }}>
                <span>{question.pairs[v[i]].right}</span>
                <button className="btn sm ghost" style={{ padding: "2px 6px" }} onClick={() => remove(i)}><Icon name="x" size={12} /></button>
              </div>
            ) : (
              <div className={"match-slot " + (overSlot === i ? "drag-over" : "")}
                style={{ flex: 1, margin: 0, minHeight: 32 }}
                onDragOver={(e) => { e.preventDefault(); setOverSlot(i); }}
                onDragLeave={() => setOverSlot(null)}
                onDrop={() => drop(i)}>
                Перетащите ответ сюда
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="match-col">
        <h4>Определения</h4>
        {question.pairs.map((p, i) => (
          <div key={i}
            className={"match-item " + (used.has(i) ? "matched" : "")}
            draggable={!used.has(i)}
            onDragStart={() => setDragging(i)}
            onDragEnd={() => setDragging(null)}>
            ⋮⋮ {p.right}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============ STUDENT: Progress ============ */
const StudentProgress = ({ progress }) => {
  const tests = Object.entries(progress.tests || {}).map(([lid, t]) => {
    const subj = window.SUBJECTS.find(s => s.id === t.subjectId);
    const less = subj?.lessons.find(l => l.id === lid);
    return { ...t, lid, subjectName: subj?.name, lessonTitle: less?.title, emoji: subj?.emoji };
  }).sort((a,b) => b.when - a.when);

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Мой прогресс</h1>
          <div className="sub">Все пройденные тесты и достижения</div>
        </div>
      </div>

      <div className="grid-3" style={{ marginBottom: 24 }}>
        <div className="stat-card">
          <span className="label">Всего тестов</span>
          <span className="value">{tests.length}</span>
        </div>
        <div className="stat-card">
          <span className="label">Средний балл</span>
          <span className="value">{tests.length ? Math.round(tests.reduce((a,t) => a+t.score, 0) / tests.length) : 0}%</span>
        </div>
        <div className="stat-card">
          <span className="label">Лучший результат</span>
          <span className="value">{tests.length ? Math.max(...tests.map(t => t.score)) : 0}%</span>
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>История тестов</h3>
      {tests.length === 0 ? (
        <div className="card empty">
          <div style={{ fontSize: 40, marginBottom: 12 }}>📝</div>
          <div>Пока нет пройденных тестов. Начни обучение и проверь знания!</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr><th>Предмет</th><th>Урок</th><th>Дата</th><th>Правильно</th><th>Балл</th></tr>
            </thead>
            <tbody>
              {tests.map((t, i) => (
                <tr key={i}>
                  <td><span style={{ fontSize: 18, marginRight: 8 }}>{t.emoji}</span>{t.subjectName}</td>
                  <td>{t.lessonTitle}</td>
                  <td style={{ color: "var(--ink-500)" }}>{new Date(t.when).toLocaleDateString("ru-RU")}</td>
                  <td>{t.correct} / {t.total}</td>
                  <td>
                    <span className={"badge " + (t.score >= 80 ? "success" : t.score >= 50 ? "warn" : "danger")}>
                      {t.score}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

/* ============ STUDENT: Achievements ============ */
const Achievements = ({ progress }) => {
  const doneLessons = Object.keys(progress.lessons || {}).length;
  const tests = Object.values(progress.tests || {});
  const perfect = tests.filter(t => t.score === 100).length;

  const achievements = [
    { e: "🎯", t: "Первые шаги", d: "Изучить первый урок", got: doneLessons >= 1 },
    { e: "📚", t: "Книжный червь", d: "Изучить 5 уроков", got: doneLessons >= 5, prog: doneLessons, max: 5 },
    { e: "🎓", t: "Эрудит", d: "Изучить 10 уроков", got: doneLessons >= 10, prog: doneLessons, max: 10 },
    { e: "💯", t: "Перфекционист", d: "Получить 100% в тесте", got: perfect >= 1 },
    { e: "🏆", t: "Чемпион", d: "5 идеальных тестов", got: perfect >= 5, prog: perfect, max: 5 },
    { e: "🔥", t: "Серия", d: "5 дней подряд", got: (progress.streak || 0) >= 5 },
    { e: "⚡", t: "Молния", d: "Пройти тест за 1 минуту", got: false },
    { e: "🌟", t: "Звезда класса", d: "Топ-3 в группе", got: false },
    { e: "🧠", t: "Гений", d: "Изучить все предметы", got: doneLessons >= 20, prog: doneLessons, max: 20 }
  ];

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Достижения</h1>
          <div className="sub">Коллекционируй награды и поднимайся выше</div>
        </div>
        <div className="badge indigo" style={{ padding: "8px 14px", fontSize: 14 }}>
          🏅 {achievements.filter(a => a.got).length} / {achievements.length} получено
        </div>
      </div>

      <div className="subject-grid">
        {achievements.map((a, i) => (
          <div key={i} className="card" style={{ textAlign: "center", padding: 22, opacity: a.got ? 1 : 0.55 }}>
            <div style={{ fontSize: 56, marginBottom: 10, filter: a.got ? "none" : "grayscale(1)" }}>{a.e}</div>
            <div style={{ fontWeight: 700, fontSize: 16, fontFamily: "var(--font-display)" }}>{a.t}</div>
            <div style={{ fontSize: 13, color: "var(--ink-500)", margin: "4px 0 12px" }}>{a.d}</div>
            {a.got ? (
              <span className="badge success">Получено ✓</span>
            ) : a.max ? (
              <>
                <div className="progress" style={{ marginBottom: 6 }}>
                  <div className="bar" style={{ width: Math.min(100, (a.prog||0)/a.max*100) + "%" }} />
                </div>
                <div style={{ fontSize: 12, color: "var(--ink-500)" }}>{a.prog || 0} / {a.max}</div>
              </>
            ) : (
              <span className="badge">Заблокировано</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ============ STUDENT: Profile ============ */
const StudentProfile = ({ user, progress, onLogout }) => {
  const doneLessons = Object.keys(progress.lessons || {}).length;
  const tests = Object.values(progress.tests || {});
  const avg = tests.length ? Math.round(tests.reduce((a,t)=>a+t.score,0)/tests.length) : 0;

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Профиль</h1>
          <div className="sub">Личные данные и настройки</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24 }}>
        <div className="card" style={{ textAlign: "center", padding: 28 }}>
          <div style={{ width: 110, height: 110, borderRadius: "50%", margin: "0 auto 14px",
            background: "linear-gradient(135deg, var(--accent-pink), var(--violet-500))",
            display: "grid", placeItems: "center", color: "white",
            fontSize: 38, fontWeight: 800, fontFamily: "var(--font-display)" }}>
            {user.initials}
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "0 0 4px" }}>{user.name}</h3>
          <div style={{ color: "var(--ink-500)", fontSize: 14, marginBottom: 14 }}>{user.email}</div>
          <span className="badge indigo">Студент · {user.group}</span>

          <div className="divider" />
          <div className="grid-3" style={{ gap: 8 }}>
            <div><div style={{ fontWeight: 800, fontSize: 22 }}>{doneLessons}</div><div style={{ fontSize: 11, color: "var(--ink-500)" }}>уроков</div></div>
            <div><div style={{ fontWeight: 800, fontSize: 22 }}>{tests.length}</div><div style={{ fontSize: 11, color: "var(--ink-500)" }}>тестов</div></div>
            <div><div style={{ fontWeight: 800, fontSize: 22 }}>{avg}%</div><div style={{ fontSize: 11, color: "var(--ink-500)" }}>средний</div></div>
          </div>
        </div>

        <div className="col" style={{ gap: 16 }}>
          <div className="card">
            <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-display)", fontSize: 18 }}>Личные данные</h3>
            <div className="grid-2">
              <div className="field"><label>Имя</label><input className="input" defaultValue={user.name} /></div>
              <div className="field"><label>Email</label><input className="input" defaultValue={user.email} /></div>
              <div className="field"><label>Класс</label><input className="input" defaultValue={user.group} /></div>
              <div className="field"><label>Телефон</label><input className="input" placeholder="+7 ..." /></div>
            </div>
            <div style={{ marginTop: 16 }}>
              <button className="btn primary">Сохранить изменения</button>
            </div>
          </div>

          <div className="card">
            <h3 style={{ margin: "0 0 16px", fontFamily: "var(--font-display)", fontSize: 18 }}>Безопасность</h3>
            <div className="grid-2">
              <div className="field"><label>Текущий пароль</label><input className="input" type="password" placeholder="••••••" /></div>
              <div className="field"><label>Новый пароль</label><input className="input" type="password" placeholder="••••••" /></div>
            </div>
            <div style={{ marginTop: 16, display: "flex", gap: 10 }}>
              <button className="btn ghost">Изменить пароль</button>
              <button className="btn danger" onClick={onLogout}>Выйти из аккаунта</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LessonReader, Quiz, StudentProgress, Achievements, StudentProfile });
