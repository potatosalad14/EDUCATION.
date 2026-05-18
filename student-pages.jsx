/* global React, Icon */
const { useState, useEffect, useMemo } = React;

/* ============ Sidebar ============ */
const Sidebar = ({ user, route, navigate, onLogout }) => {
  const studentNav = [
    { id: "dashboard", label: "Дашборд", icon: "home" },
    { id: "subjects", label: "Предметы", icon: "book" },
    { id: "progress", label: "Мой прогресс", icon: "chart" },
    { id: "achievements", label: "Достижения", icon: "trophy" },
    { id: "profile", label: "Профиль", icon: "user" }
  ];
  const teacherNav = [
    { id: "t-dashboard", label: "Дашборд", icon: "home" },
    { id: "t-students", label: "Ученики", icon: "grad" },
    { id: "t-courses", label: "Курсы и теория", icon: "book" },
    { id: "t-tests", label: "Тесты", icon: "test" },
    { id: "t-analytics", label: "Аналитика", icon: "chart" }
  ];
  const items = user.role === "student" ? studentNav : teacherNav;
  const isActive = (id) => route.page === id || route.section === id;

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">M</div>
        <span>marishka.edu</span>
      </div>

      <div className="nav-section">
        {user.role === "student" ? "Обучение" : "Преподавание"}
      </div>
      {items.map(it => (
        <button key={it.id}
          className={"nav-item " + (isActive(it.id) ? "active" : "")}
          onClick={() => navigate({ page: it.id })}>
          <Icon name={it.icon} size={18} />
          <span>{it.label}</span>
        </button>
      ))}

      <div className="spacer" />

      <button className="nav-item" onClick={onLogout}>
        <Icon name="logout" size={18} />
        <span>Выйти</span>
      </button>

      <div className="user-card">
        <div className="avatar">{user.initials}</div>
        <div>
          <div className="name">{user.name}</div>
          <div className="role">{user.role === "student" ? "Студент · " + user.group : "Преподаватель"}</div>
        </div>
      </div>
    </aside>
  );
};

/* ============ STUDENT: Dashboard ============ */
const StudentDashboard = ({ user, navigate, progress }) => {
  const totalLessons = window.SUBJECTS.reduce((a, s) => a + s.lessons.length, 0);
  const doneLessons = Object.keys(progress.lessons || {}).length;
  const passedTests = Object.values(progress.tests || {}).filter(t => t.score >= 60).length;
  const avgScore = (() => {
    const arr = Object.values(progress.tests || {});
    if (!arr.length) return 0;
    return Math.round(arr.reduce((a,t) => a + t.score, 0) / arr.length);
  })();

  const recommended = window.SUBJECTS.slice(0, 3);

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Привет, {user.name.split(" ")[0]}! 👋</h1>
          <div className="sub">Готов(а) продолжить обучение? Сегодня тебя ждут новые уроки.</div>
        </div>
        <button className="btn primary" onClick={() => navigate({ page: "subjects" })}>
          <Icon name="play" size={16} /> Продолжить учиться
        </button>
      </div>

      <div className="grid-4" style={{ marginBottom: 28 }}>
        <div className="stat-card">
          <span className="label">Изучено уроков</span>
          <span className="value">{doneLessons}<span style={{ fontSize: 18, color: "var(--ink-400)", fontWeight: 600 }}> / {totalLessons}</span></span>
          <span className="delta up">+{Math.max(0, doneLessons - 1)} за неделю</span>
        </div>
        <div className="stat-card">
          <span className="label">Тестов пройдено</span>
          <span className="value">{passedTests}</span>
          <span className="delta up">средний балл {avgScore || "—"}%</span>
        </div>
        <div className="stat-card">
          <span className="label">Ударная серия</span>
          <span className="value" style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            {progress.streak || 5}<span style={{ fontSize: 22 }}>🔥</span>
          </span>
          <span className="delta up">дней подряд</span>
        </div>
        <div className="stat-card">
          <span className="label">Уровень</span>
          <span className="value">{Math.floor(doneLessons / 3) + 1}</span>
          <div className="progress" style={{ marginTop: 6 }}>
            <div className="bar" style={{ width: ((doneLessons % 3) * 33.3) + "%" }} />
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>Продолжить обучение</h3>
          <div className="subject-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
            {recommended.map(s => {
              const lessonsDone = s.lessons.filter(l => (progress.lessons || {})[l.id]).length;
              const pct = Math.round(lessonsDone / s.lessons.length * 100);
              return (
                <div key={s.id} className="subject-card" onClick={() => navigate({ page: "subject", subjectId: s.id })}>
                  <div className="subject-cover" style={{ background: s.bg }}>{s.emoji}</div>
                  <div className="subject-body">
                    <h3>{s.name}</h3>
                    <p>{s.short}</p>
                    <div className="progress"><div className="bar" style={{ width: pct + "%" }} /></div>
                    <div className="subject-meta" style={{ marginTop: 10 }}>
                      <span>{lessonsDone} / {s.lessons.length} уроков</span>
                      <span style={{ fontWeight: 700, color: "var(--indigo-600)" }}>{pct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "0 0 14px" }}>Цели на неделю</h3>
          <div className="card" style={{ padding: 18 }}>
            {[
              { label: "Изучить 5 уроков", cur: Math.min(doneLessons, 5), tot: 5 },
              { label: "Пройти 3 теста", cur: Math.min(passedTests, 3), tot: 3 },
              { label: "Серия 7 дней", cur: progress.streak || 5, tot: 7 }
            ].map((g, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? 16 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
                  <span style={{ fontWeight: 600 }}>{g.label}</span>
                  <span style={{ color: "var(--ink-500)" }}>{g.cur}/{g.tot}</span>
                </div>
                <div className="progress"><div className="bar" style={{ width: Math.min(100, g.cur/g.tot*100) + "%" }} /></div>
              </div>
            ))}
          </div>

          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, margin: "20px 0 14px" }}>Последние достижения</h3>
          <div className="card" style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { e: "🎯", t: "Первый тест на 100%", d: "Получено вчера" },
              { e: "📚", t: "5 уроков подряд", d: "На этой неделе" },
              { e: "🔥", t: "Серия 5 дней", d: "Продолжай!" }
            ].map((a, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--indigo-50)", display: "grid", placeItems: "center", fontSize: 22 }}>{a.e}</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{a.t}</div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-500)" }}>{a.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============ STUDENT: Subjects list ============ */
const SubjectsList = ({ navigate, progress }) => {
  const [q, setQ] = useState("");
  const filtered = window.SUBJECTS.filter(s => s.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <h1>Все предметы</h1>
          <div className="sub">Выбери дисциплину и продолжи обучение</div>
        </div>
        <div style={{ position: "relative", width: 260 }}>
          <Icon name="search" size={16} className="" />
          <input className="input" placeholder="Поиск предмета..."
            value={q} onChange={e => setQ(e.target.value)}
            style={{ paddingLeft: 38 }} />
          <div style={{ position: "absolute", left: 12, top: 12, color: "var(--ink-400)" }}>
            <Icon name="search" size={16} />
          </div>
        </div>
      </div>

      <div className="subject-grid">
        {filtered.map(s => {
          const lessonsDone = s.lessons.filter(l => (progress.lessons || {})[l.id]).length;
          const pct = Math.round(lessonsDone / s.lessons.length * 100);
          return (
            <div key={s.id} className="subject-card" onClick={() => navigate({ page: "subject", subjectId: s.id })}>
              <div className="subject-cover" style={{ background: s.bg }}>{s.emoji}</div>
              <div className="subject-body">
                <h3>{s.name}</h3>
                <p>{s.short}</p>
                <div className="progress"><div className="bar" style={{ width: pct + "%" }} /></div>
                <div className="subject-meta" style={{ marginTop: 10 }}>
                  <span>{s.lessons.length} уроков</span>
                  <span style={{ fontWeight: 700, color: "var(--indigo-600)" }}>{pct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ============ STUDENT: Subject detail (lessons list) ============ */
const SubjectDetail = ({ subjectId, navigate, progress }) => {
  const subject = window.SUBJECTS.find(s => s.id === subjectId);
  if (!subject) return <div>Предмет не найден</div>;
  const lessonsDone = subject.lessons.filter(l => (progress.lessons || {})[l.id]).length;
  const pct = Math.round(lessonsDone / subject.lessons.length * 100);

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 20 }}>
        <button className="btn ghost sm" onClick={() => navigate({ page: "subjects" })}>
          <Icon name="arrowL" size={14} /> К предметам
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}>
        <div style={{ background: subject.bg, padding: "32px 36px", display: "flex", alignItems: "center", gap: 24 }}>
          <div style={{ fontSize: 64 }}>{subject.emoji}</div>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 800, margin: "0 0 4px", color: "var(--ink-900)" }}>{subject.name}</h1>
            <div style={{ color: "var(--ink-700)", fontSize: 15 }}>{subject.short}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "var(--font-display)" }}>{pct}%</div>
            <div style={{ fontSize: 13, color: "var(--ink-700)" }}>пройдено</div>
          </div>
        </div>
        <div style={{ padding: "16px 36px", display: "flex", gap: 24, fontSize: 14, color: "var(--ink-600)" }}>
          <span><Icon name="book" size={14} /> {subject.lessons.length} уроков</span>
          <span><Icon name="test" size={14} /> {subject.lessons.length} тестов</span>
          <span><Icon name="clock" size={14} /> ~{subject.lessons.reduce((a,l) => a + l.duration, 0)} мин</span>
        </div>
      </div>

      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, margin: "0 0 14px" }}>Программа курса</h3>
      <div className="col" style={{ gap: 12 }}>
        {subject.lessons.map((l, i) => {
          const done = !!(progress.lessons || {})[l.id];
          const test = (progress.tests || {})[l.id];
          return (
            <div key={l.id} className="card" style={{ display: "flex", alignItems: "center", gap: 18, padding: 18, cursor: "pointer" }}
              onClick={() => navigate({ page: "lesson", subjectId: subject.id, lessonId: l.id })}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: done ? "var(--success-bg)" : "var(--indigo-50)",
                color: done ? "var(--success)" : "var(--indigo-600)",
                display: "grid", placeItems: "center", fontWeight: 800, fontSize: 16 }}>
                {done ? <Icon name="check" size={18} /> : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{l.title}</div>
                <div style={{ fontSize: 13, color: "var(--ink-500)", display: "flex", gap: 14 }}>
                  <span><Icon name="clock" size={12} /> {l.duration} мин</span>
                  <span><Icon name="test" size={12} /> {l.quiz.length} вопросов</span>
                  {test && <span className="badge success" style={{ padding: "1px 8px" }}>Тест: {test.score}%</span>}
                </div>
              </div>
              <Icon name="arrow" size={18} className="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

Object.assign(window, { Sidebar, StudentDashboard, SubjectsList, SubjectDetail });
