/* global React, Icon */
const { useState } = React;

/* ============ TEACHER: Tests editor ============ */
const TeacherTests = () => {
  const [selectedSubject, setSelectedSubject] = useState(window.SUBJECTS[0].id);
  const [selectedLesson, setSelectedLesson] = useState(window.SUBJECTS[0].lessons[0].id);
  const [editingQ, setEditingQ] = useState(null);

  const subject = window.SUBJECTS.find(s => s.id === selectedSubject);
  const lesson = subject.lessons.find(l => l.id === selectedLesson) || subject.lessons[0];

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Редактор тестов</h1>
          <div className="sub">Создавайте и редактируйте вопросы для тестов по урокам</div>
        </div>
        <button className="btn primary"><Icon name="plus" size={14} /> Новый вопрос</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        <div>
          <div className="card" style={{ padding: 10 }}>
            <h4 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink-500)", margin: "8px 10px", fontWeight: 700 }}>Предмет</h4>
            <select className="select" value={selectedSubject} onChange={e => {
              setSelectedSubject(e.target.value);
              const sub = window.SUBJECTS.find(s => s.id === e.target.value);
              setSelectedLesson(sub.lessons[0].id);
            }}>
              {window.SUBJECTS.map(s => <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>)}
            </select>
            <h4 style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--ink-500)", margin: "16px 10px 6px", fontWeight: 700 }}>Урок</h4>
            <div className="col" style={{ gap: 4 }}>
              {subject.lessons.map(l => (
                <button key={l.id}
                  className={"nav-item " + (l.id === selectedLesson ? "active" : "")}
                  style={{ color: l.id === selectedLesson ? "var(--indigo-700)" : "var(--ink-700)",
                    background: l.id === selectedLesson ? "var(--indigo-50)" : "transparent",
                    fontSize: 13 }}
                  onClick={() => setSelectedLesson(l.id)}>
                  <span style={{ flex: 1, textAlign: "left" }}>{l.title}</span>
                  <span className="badge" style={{ padding: "1px 6px", fontSize: 10 }}>{l.quiz.length}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "var(--ink-500)" }}>{subject.name}</div>
                <h2 style={{ margin: "2px 0 0", fontFamily: "var(--font-display)", fontSize: 22 }}>Тест: {lesson.title}</h2>
              </div>
              <div className="row">
                <span className="badge indigo">{lesson.quiz.length} вопросов</span>
                <span className="badge">~{lesson.quiz.length * 1.5} мин</span>
              </div>
            </div>
          </div>

          <div className="col" style={{ gap: 12 }}>
            {lesson.quiz.map((q, i) => (
              <div key={i} className="card" style={{ padding: 18 }}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 10 }}>
                  <div className="row" style={{ gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: "var(--indigo-500)", color: "white", display: "grid", placeItems: "center", fontWeight: 700, fontSize: 13 }}>{i+1}</div>
                    <span className="badge violet" style={{ textTransform: "uppercase", fontSize: 10 }}>
                      {q.type === "single" && "одиночный"}
                      {q.type === "multi" && "множественный"}
                      {q.type === "input" && "ввод"}
                      {q.type === "match" && "сопоставление"}
                    </span>
                  </div>
                  <div className="row" style={{ gap: 4 }}>
                    <button className="btn ghost sm" onClick={() => setEditingQ(i)}><Icon name="edit" size={12} /> Изм.</button>
                    <button className="btn ghost sm" style={{ color: "var(--danger)" }}><Icon name="trash" size={12} /></button>
                  </div>
                </div>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 10 }}>{q.q}</div>
                {q.type === "single" && (
                  <div className="col" style={{ gap: 6 }}>
                    {q.options.map((opt, j) => (
                      <div key={j} className="row" style={{ gap: 8, fontSize: 13.5,
                        color: j === q.correct ? "var(--success)" : "var(--ink-600)",
                        fontWeight: j === q.correct ? 600 : 400 }}>
                        {j === q.correct ? <Icon name="check" size={14} /> : <span style={{ width: 14 }}>·</span>}
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
                {q.type === "multi" && (
                  <div className="col" style={{ gap: 6 }}>
                    {q.options.map((opt, j) => (
                      <div key={j} className="row" style={{ gap: 8, fontSize: 13.5,
                        color: q.correct.includes(j) ? "var(--success)" : "var(--ink-600)",
                        fontWeight: q.correct.includes(j) ? 600 : 400 }}>
                        {q.correct.includes(j) ? <Icon name="check" size={14} /> : <span style={{ width: 14 }}>·</span>}
                        {opt}
                      </div>
                    ))}
                  </div>
                )}
                {q.type === "input" && (
                  <div style={{ fontSize: 13.5, color: "var(--ink-600)" }}>
                    Правильный ответ: <b style={{ color: "var(--success)" }}>{q.correct}</b>
                  </div>
                )}
                {q.type === "match" && (
                  <div className="grid-2" style={{ gap: 8 }}>
                    {q.pairs.map((p, j) => (
                      <div key={j} className="row" style={{ gap: 8, fontSize: 13.5, padding: "6px 10px", background: "var(--ink-50)", borderRadius: 8 }}>
                        <b>{p.left}</b> → {p.right}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <button className="btn ghost" style={{ borderStyle: "dashed", padding: "20px" }}>
              <Icon name="plus" size={16} /> Добавить вопрос
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ TEACHER: Analytics ============ */
const TeacherAnalytics = () => {
  const subjects = window.SUBJECTS;
  const subjectStats = subjects.map((s, i) => ({
    ...s,
    avgScore: 60 + ((i*13) % 35),
    completion: 40 + ((i*17) % 50),
    activeStudents: 6 + (i % 4)
  }));

  // Activity over 7 days
  const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
  const activity = [42, 58, 51, 67, 72, 38, 24];

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Аналитика</h1>
          <div className="sub">Подробные метрики по обучению и успеваемости</div>
        </div>
        <div className="row">
          <select className="select" style={{ width: 160 }} defaultValue="week">
            <option value="week">За неделю</option>
            <option value="month">За месяц</option>
            <option value="year">За год</option>
          </select>
          <button className="btn ghost"><Icon name="chart" size={14} /> Экспорт</button>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card"><span className="label">Уроков пройдено</span><span className="value">352</span><span className="delta up">+12% к пред. периоду</span></div>
        <div className="stat-card"><span className="label">Тестов сдано</span><span className="value">287</span><span className="delta up">+8%</span></div>
        <div className="stat-card"><span className="label">Активных учеников</span><span className="value">10</span><span className="delta up">+2</span></div>
        <div className="stat-card"><span className="label">Средний балл</span><span className="value">78%</span><span className="delta up">+3%</span></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 18px" }}>Активность за неделю</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 14, height: 220, padding: "0 10px" }}>
            {days.map((d, i) => {
              const h = activity[i] / Math.max(...activity) * 100;
              return (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "var(--ink-700)" }}>{activity[i]}</div>
                  <div style={{ width: "100%", height: h + "%",
                    background: "linear-gradient(180deg, var(--indigo-400), var(--violet-600))",
                    borderRadius: "8px 8px 4px 4px" }} />
                  <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 600 }}>{d}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="card">
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 18px" }}>Распределение по типам</h3>
          <div className="col" style={{ gap: 14 }}>
            {[
              { t: "Лекции", v: 45, c: "var(--indigo-500)" },
              { t: "Тесты", v: 30, c: "var(--violet-500)" },
              { t: "Практика", v: 18, c: "var(--accent-pink)" },
              { t: "Видео", v: 7, c: "var(--accent-amber)" }
            ].map((x,i) => (
              <div key={i}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{x.t}</span>
                  <span style={{ fontSize: 13, color: "var(--ink-500)" }}>{x.v}%</span>
                </div>
                <div style={{ height: 8, background: "var(--ink-100)", borderRadius: 99, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: x.v + "%", background: x.c, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>Метрики по предметам</h3>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr><th>Предмет</th><th>Активных учеников</th><th>Прохождение</th><th>Средний балл теста</th><th>Сложность</th></tr>
          </thead>
          <tbody>
            {subjectStats.map(s => (
              <tr key={s.id}>
                <td><div className="row" style={{ gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: s.bg, display: "grid", placeItems: "center", fontSize: 16 }}>{s.emoji}</div>
                  <span style={{ fontWeight: 600 }}>{s.name}</span>
                </div></td>
                <td>{s.activeStudents}</td>
                <td style={{ width: 200 }}>
                  <div className="row" style={{ gap: 10 }}>
                    <div className="progress" style={{ flex: 1 }}><div className="bar" style={{ width: s.completion + "%" }} /></div>
                    <span style={{ fontSize: 12, color: "var(--ink-500)" }}>{s.completion}%</span>
                  </div>
                </td>
                <td>
                  <span className={"badge " + (s.avgScore >= 80 ? "success" : s.avgScore >= 60 ? "warn" : "danger")}>
                    {s.avgScore}%
                  </span>
                </td>
                <td>
                  <span className="badge">{s.avgScore < 65 ? "Высокая" : s.avgScore < 80 ? "Средняя" : "Низкая"}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

Object.assign(window, { TeacherTests, TeacherAnalytics });
