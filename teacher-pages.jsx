/* global React, Icon */
const { useState, useMemo } = React;

/* ============ TEACHER: Dashboard ============ */
const TeacherDashboard = ({ user, navigate }) => {
  const students = window.STUDENTS;
  const avgClass = Math.round(students.reduce((a,s) => a + s.avg, 0) / students.length);
  const completedTotal = students.reduce((a,s) => a + s.completed, 0);

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Здравствуйте, {user.name.split(" ")[0]}!</h1>
          <div className="sub">Вот как идут дела ваших классов сегодня</div>
        </div>
        <div className="row">
          <button className="btn ghost"><Icon name="bell" size={16} /> Уведомления</button>
          <button className="btn primary" onClick={() => navigate({ page: "t-tests" })}>
            <Icon name="plus" size={16} /> Создать тест
          </button>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <span className="label">Учеников всего</span>
          <span className="value">{students.length}</span>
          <span className="delta up">+2 за месяц</span>
        </div>
        <div className="stat-card">
          <span className="label">Средний балл класса</span>
          <span className="value">{avgClass}%</span>
          <span className="delta up">+4% к прошлой неделе</span>
        </div>
        <div className="stat-card">
          <span className="label">Уроков пройдено</span>
          <span className="value">{completedTotal}</span>
          <span className="delta up">за всё время</span>
        </div>
        <div className="stat-card">
          <span className="label">Требуют внимания</span>
          <span className="value" style={{ color: "var(--danger)" }}>{students.filter(s => s.avg < 70).length}</span>
          <span className="delta down">средний балл &lt; 70%</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: 0 }}>Распределение успеваемости</h3>
            <a href="#" onClick={(e) => { e.preventDefault(); navigate({ page: "t-students" }); }}>Все ученики →</a>
          </div>
          <div className="card">
            <ScoreDistribution students={students} />
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "26px 0 14px" }}>Топ ученики</h3>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Ученик</th><th>Группа</th><th>Прогресс</th><th>Средний</th></tr></thead>
              <tbody>
                {[...students].sort((a,b) => b.avg - a.avg).slice(0,5).map(s => (
                  <tr key={s.id} onClick={() => navigate({ page: "t-student", studentId: s.id })} style={{ cursor: "pointer" }}>
                    <td><div className="row" style={{ gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--indigo-500)", color: "white", display: "grid", placeItems: "center", fontSize: 12, fontWeight: 700 }}>
                        {s.name.split(" ").map(x => x[0]).join("")}
                      </div>
                      <span style={{ fontWeight: 600 }}>{s.name}</span>
                    </div></td>
                    <td>{s.group}</td>
                    <td style={{ width: 160 }}>
                      <div className="progress"><div className="bar" style={{ width: (s.completed/s.total*100) + "%" }} /></div>
                    </td>
                    <td><span className={"badge " + (s.avg >= 80 ? "success" : s.avg >= 60 ? "warn" : "danger")}>{s.avg}%</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>Последняя активность</h3>
          <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            {window.RECENT_ACTIVITY.map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10,
                  background: a.score === null ? "var(--indigo-50)" : a.score >= 80 ? "var(--success-bg)" : a.score >= 60 ? "var(--warn-bg)" : "var(--danger-bg)",
                  color: a.score === null ? "var(--indigo-600)" : a.score >= 80 ? "var(--success)" : a.score >= 60 ? "var(--warn)" : "var(--danger)",
                  display: "grid", placeItems: "center", fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
                  {a.score !== null ? a.score : "📖"}
                </div>
                <div style={{ flex: 1, fontSize: 13.5 }}>
                  <div><b>{a.who}</b> {a.action}</div>
                  <div style={{ color: "var(--ink-500)", fontSize: 12.5 }}>{a.subject} · {a.topic}</div>
                </div>
                <div style={{ color: "var(--ink-400)", fontSize: 12, whiteSpace: "nowrap" }}>{a.ago}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "20px 0 14px" }}>Курсы</h3>
          <div className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {window.SUBJECTS.slice(0,5).map(s => (
              <div key={s.id} className="row" style={{ gap: 12, padding: 8, borderRadius: 10, cursor: "pointer" }}
                onClick={() => navigate({ page: "t-courses", subjectId: s.id })}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: s.bg, display: "grid", placeItems: "center", fontSize: 18 }}>{s.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)" }}>{s.lessons.length} уроков</div>
                </div>
                <Icon name="arrow" size={14} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ScoreDistribution = ({ students }) => {
  const buckets = [
    { label: "90-100%", min: 90, max: 100, color: "var(--success)" },
    { label: "80-89%",  min: 80, max: 89,  color: "var(--accent-mint)" },
    { label: "70-79%",  min: 70, max: 79,  color: "var(--indigo-500)" },
    { label: "60-69%",  min: 60, max: 69,  color: "var(--warn)" },
    { label: "< 60%",   min: 0,  max: 59,  color: "var(--danger)" }
  ];
  const max = students.length;
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 180, padding: "10px 6px" }}>
      {buckets.map((b, i) => {
        const count = students.filter(s => s.avg >= b.min && s.avg <= b.max).length;
        const h = max ? Math.max(8, count / max * 100) : 8;
        return (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-700)" }}>{count}</div>
            <div style={{ width: "100%", height: h + "%", background: b.color, borderRadius: "8px 8px 4px 4px", minHeight: 8 }} />
            <div style={{ fontSize: 12, color: "var(--ink-500)", fontWeight: 600 }}>{b.label}</div>
          </div>
        );
      })}
    </div>
  );
};

/* ============ TEACHER: Students list ============ */
const TeacherStudents = ({ navigate }) => {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("all");
  const filtered = window.STUDENTS.filter(s =>
    s.name.toLowerCase().includes(q.toLowerCase()) &&
    (group === "all" || s.group === group)
  );
  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Ученики</h1>
          <div className="sub">{filtered.length} учеников · средний балл {Math.round(filtered.reduce((a,s)=>a+s.avg,0)/(filtered.length||1))}%</div>
        </div>
        <div className="row">
          <select className="select" style={{ width: 130 }} value={group} onChange={e => setGroup(e.target.value)}>
            <option value="all">Все группы</option>
            <option value="10-А">10-А</option>
            <option value="10-Б">10-Б</option>
          </select>
          <input className="input" style={{ width: 240 }} placeholder="Поиск ученика..."
            value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              <th>Ученик</th><th>Группа</th><th>Прогресс по курсам</th><th>Последний вход</th><th>Тренд</th><th>Средний балл</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} style={{ cursor: "pointer" }} onClick={() => navigate({ page: "t-student", studentId: s.id })}>
                <td>
                  <div className="row" style={{ gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%",
                      background: "linear-gradient(135deg, var(--indigo-500), var(--violet-500))",
                      color: "white", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>
                      {s.name.split(" ").map(x => x[0]).join("")}
                    </div>
                    <span style={{ fontWeight: 600 }}>{s.name}</span>
                  </div>
                </td>
                <td>{s.group}</td>
                <td style={{ width: 220 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="progress" style={{ flex: 1 }}>
                      <div className="bar" style={{ width: (s.completed/s.total*100) + "%" }} />
                    </div>
                    <span style={{ fontSize: 12, color: "var(--ink-500)", whiteSpace: "nowrap" }}>{s.completed}/{s.total}</span>
                  </div>
                </td>
                <td style={{ color: "var(--ink-500)" }}>{s.last}</td>
                <td>
                  {s.trend === "up" && <span style={{ color: "var(--success)" }}>↑ Растёт</span>}
                  {s.trend === "flat" && <span style={{ color: "var(--ink-500)" }}>→ Стабильно</span>}
                  {s.trend === "down" && <span style={{ color: "var(--danger)" }}>↓ Падает</span>}
                </td>
                <td>
                  <span className={"badge " + (s.avg >= 80 ? "success" : s.avg >= 60 ? "warn" : "danger")}>
                    {s.avg}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ============ TEACHER: One student detail ============ */
const TeacherStudentDetail = ({ studentId, navigate }) => {
  const s = window.STUDENTS.find(x => x.id === studentId);
  if (!s) return <div>Ученик не найден</div>;

  // Generate per-subject breakdown
  const breakdown = window.SUBJECTS.map((sub, i) => ({
    ...sub,
    score: Math.max(40, Math.min(100, s.avg + ((i*7) % 20) - 10)),
    completed: Math.floor(sub.lessons.length * (s.completed / s.total) * (0.8 + (i%3)*0.1))
  }));

  // Synthetic recent tests
  const recentTests = breakdown.slice(0, 5).map((b, i) => ({
    subject: b.name,
    emoji: b.emoji,
    lesson: b.lessons[0]?.title || "—",
    score: b.score,
    when: ["сегодня", "вчера", "3 дня назад", "неделю назад", "2 недели назад"][i]
  }));

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 16 }}>
        <button className="btn ghost sm" onClick={() => navigate({ page: "t-students" })}>
          <Icon name="arrowL" size={14} /> К списку учеников
        </button>
      </div>

      <div className="card" style={{ padding: 28, marginBottom: 24, display: "flex", gap: 24, alignItems: "center" }}>
        <div style={{ width: 88, height: 88, borderRadius: "50%",
          background: "linear-gradient(135deg, var(--indigo-500), var(--violet-500))",
          color: "white", display: "grid", placeItems: "center", fontSize: 28, fontWeight: 800 }}>
          {s.name.split(" ").map(x => x[0]).join("")}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, margin: "0 0 4px" }}>{s.name}</h1>
          <div style={{ color: "var(--ink-500)", marginBottom: 8 }}>Группа {s.group} · последний вход: {s.last}</div>
          <div className="row">
            <span className={"badge " + (s.avg >= 80 ? "success" : s.avg >= 60 ? "warn" : "danger")}>
              Средний балл: {s.avg}%
            </span>
            {s.trend === "up" && <span className="badge success">↑ Растёт</span>}
            {s.trend === "down" && <span className="badge danger">↓ Снижается</span>}
            {s.trend === "flat" && <span className="badge">→ Стабильно</span>}
          </div>
        </div>
        <div className="row">
          <button className="btn ghost"><Icon name="bell" size={14} /> Написать</button>
          <button className="btn primary"><Icon name="flag" size={14} /> Дать задание</button>
        </div>
      </div>

      <div className="grid-4" style={{ marginBottom: 24 }}>
        <div className="stat-card"><span className="label">Уроков пройдено</span><span className="value">{s.completed}/{s.total}</span></div>
        <div className="stat-card"><span className="label">Тестов сдано</span><span className="value">{Math.floor(s.completed * 0.9)}</span></div>
        <div className="stat-card"><span className="label">Время в обучении</span><span className="value">14ч</span></div>
        <div className="stat-card"><span className="label">Место в группе</span><span className="value">3 из 5</span></div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 24 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>Успеваемость по предметам</h3>
          <div className="card" style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            {breakdown.map(b => (
              <div key={b.id}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{b.emoji} {b.name}</span>
                  <span style={{ color: "var(--ink-500)", fontSize: 13 }}>
                    {b.completed}/{b.lessons.length} уроков ·{" "}
                    <b style={{ color: b.score >= 80 ? "var(--success)" : b.score >= 60 ? "var(--warn)" : "var(--danger)" }}>{b.score}%</b>
                  </span>
                </div>
                <div className={"progress " + (b.score >= 80 ? "success" : b.score < 60 ? "danger" : "")}>
                  <div className="bar" style={{ width: b.score + "%" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>Последние тесты</h3>
          <div className="card" style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {recentTests.map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 8 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--ink-50)", display: "grid", placeItems: "center", fontSize: 18 }}>{t.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{t.subject}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{t.lesson} · {t.when}</div>
                </div>
                <span className={"badge " + (t.score >= 80 ? "success" : t.score >= 60 ? "warn" : "danger")}>{t.score}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ TEACHER: Courses & theory ============ */
const TeacherCourses = ({ navigate, route }) => {
  const [selectedId, setSelectedId] = useState(route.subjectId || window.SUBJECTS[0].id);
  const [editingLesson, setEditingLesson] = useState(null);
  const subject = window.SUBJECTS.find(s => s.id === selectedId);

  if (editingLesson) {
    const lesson = subject.lessons.find(l => l.id === editingLesson);
    return <LessonEditor subject={subject} lesson={lesson} onClose={() => setEditingLesson(null)} />;
  }

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Курсы и теория</h1>
          <div className="sub">Редактируйте теоретические материалы по предметам</div>
        </div>
        <button className="btn primary"><Icon name="plus" size={14} /> Новый курс</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20 }}>
        <div className="card" style={{ padding: 10 }}>
          {window.SUBJECTS.map(s => (
            <button key={s.id}
              className={"nav-item " + (s.id === selectedId ? "active" : "")}
              style={{ color: s.id === selectedId ? "var(--indigo-700)" : "var(--ink-700)",
                background: s.id === selectedId ? "var(--indigo-50)" : "transparent" }}
              onClick={() => setSelectedId(s.id)}>
              <span style={{ fontSize: 18 }}>{s.emoji}</span>
              <span style={{ flex: 1, textAlign: "left" }}>{s.name}</span>
              <span style={{ fontSize: 12, color: "var(--ink-400)" }}>{s.lessons.length}</span>
            </button>
          ))}
        </div>

        <div>
          <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ background: subject.bg, padding: "20px 24px", display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 40 }}>{subject.emoji}</div>
              <div style={{ flex: 1 }}>
                <h2 style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: 22 }}>{subject.name}</h2>
                <div style={{ fontSize: 13, color: "var(--ink-700)" }}>{subject.short}</div>
              </div>
              <button className="btn ghost"><Icon name="edit" size={14} /> Редактировать</button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, margin: 0 }}>Уроки ({subject.lessons.length})</h3>
            <button className="btn primary sm"><Icon name="plus" size={14} /> Добавить урок</button>
          </div>

          <div className="col" style={{ gap: 8 }}>
            {subject.lessons.map((l, i) => (
              <div key={l.id} className="card" style={{ display: "flex", alignItems: "center", gap: 14, padding: 14 }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--ink-100)", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>{i+1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{l.title}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-500)" }}>{l.duration} мин · {l.body.length} блоков · {l.quiz.length} вопросов</div>
                </div>
                <button className="btn ghost sm" onClick={() => setEditingLesson(l.id)}><Icon name="edit" size={12} /> Редактировать</button>
                <button className="btn ghost sm"><Icon name="eye" size={12} /></button>
                <button className="btn ghost sm" style={{ color: "var(--danger)" }}><Icon name="trash" size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const LessonEditor = ({ subject, lesson, onClose }) => {
  const [title, setTitle] = useState(lesson.title);
  const [duration, setDuration] = useState(lesson.duration);
  return (
    <div className="fade-in">
      <div style={{ marginBottom: 16 }}>
        <button className="btn ghost sm" onClick={onClose}><Icon name="arrowL" size={14} /> Назад к курсу</button>
      </div>
      <div className="page-head">
        <div>
          <h1>Редактор урока</h1>
          <div className="sub">{subject.name} · {lesson.title}</div>
        </div>
        <div className="row">
          <button className="btn ghost">Предпросмотр</button>
          <button className="btn primary">Сохранить</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        <div className="card">
          <div className="grid-2" style={{ marginBottom: 18 }}>
            <div className="field"><label>Название урока</label><input className="input" value={title} onChange={e => setTitle(e.target.value)} /></div>
            <div className="field"><label>Длительность (мин)</label><input className="input" type="number" value={duration} onChange={e => setDuration(+e.target.value)} /></div>
          </div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, margin: "0 0 12px" }}>Содержание</h3>
          <div className="col" style={{ gap: 10 }}>
            {lesson.body.map((b, i) => (
              <div key={i} className="card" style={{ padding: 12, background: "var(--ink-50)", border: "1px dashed var(--ink-200)" }}>
                <div className="row" style={{ justifyContent: "space-between", marginBottom: 6 }}>
                  <span className="badge indigo" style={{ textTransform: "uppercase", fontSize: 10 }}>{b.type}</span>
                  <div className="row" style={{ gap: 4 }}>
                    <button className="btn ghost sm" style={{ padding: "2px 6px" }}><Icon name="edit" size={12} /></button>
                    <button className="btn ghost sm" style={{ padding: "2px 6px", color: "var(--danger)" }}><Icon name="trash" size={12} /></button>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink-700)" }}>
                  {b.text || (b.items && b.items.join(" · ")) || "—"}
                </div>
              </div>
            ))}
            <button className="btn ghost" style={{ borderStyle: "dashed" }}><Icon name="plus" size={14} /> Добавить блок</button>
          </div>
        </div>

        <div>
          <div className="card">
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, margin: "0 0 10px" }}>Типы блоков</h4>
            <div className="col" style={{ gap: 6 }}>
              {[
                { t: "Параграф", e: "📄" },
                { t: "Заголовок", e: "🔤" },
                { t: "Формула", e: "𝑓" },
                { t: "Код", e: "</>" },
                { t: "Выноска", e: "💡" },
                { t: "Список", e: "•" },
                { t: "Изображение", e: "🖼" }
              ].map((x,i) => (
                <button key={i} className="btn ghost" style={{ justifyContent: "flex-start", fontSize: 13 }}>
                  <span style={{ width: 20 }}>{x.e}</span>{x.t}
                </button>
              ))}
            </div>
          </div>

          <div className="card" style={{ marginTop: 14 }}>
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: 14, margin: "0 0 10px" }}>Тест ({lesson.quiz.length})</h4>
            <div style={{ fontSize: 13, color: "var(--ink-500)", marginBottom: 10 }}>Вопросы привязаны к этому уроку</div>
            <button className="btn primary full sm">Открыть редактор теста</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { TeacherDashboard, TeacherStudents, TeacherStudentDetail, TeacherCourses });
