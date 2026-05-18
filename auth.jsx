/* global React */
const { useState } = React;

/* Inline SVG icons */
const Icon = ({ name, size = 20, className = "" }) => {
  const paths = {
    home: <path d="M3 11l9-8 9 8v9a2 2 0 0 1-2 2h-4v-7h-6v7H5a2 2 0 0 1-2-2v-9z" />,
    book: <path d="M4 4h12a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4V4zM4 20h13" />,
    chart: <path d="M4 19V5M4 19h16M8 16V10M12 16V7M16 16v-5" />,
    user: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 4-7 8-7s8 3 8 7" /></>,
    grad: <path d="M2 9l10-5 10 5-10 5L2 9zm4 4v4c0 1 3 3 6 3s6-2 6-3v-4" />,
    test: <path d="M9 11l3 3 8-8M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />,
    logout: <path d="M16 17l5-5-5-5M21 12H9M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />,
    plus: <path d="M12 5v14M5 12h14" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
    arrow: <path d="M5 12h14M13 5l7 7-7 7" />,
    arrowL: <path d="M19 12H5M11 19l-7-7 7-7" />,
    check: <path d="M5 12l5 5L20 7" />,
    x: <path d="M6 6l12 12M18 6L6 18" />,
    clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
    flame: <path d="M12 2c1 4 5 5 5 11a5 5 0 0 1-10 0c0-3 2-4 2-7 1 1 3 2 3-4z" />,
    edit: <path d="M4 20h4l11-11-4-4L4 16v4zM14 5l4 4" />,
    trash: <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M6 6v14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6" />,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></>,
    bell: <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9zM10 21a2 2 0 0 0 4 0" />,
    trophy: <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM7 7H4a2 2 0 0 0-2 2c0 3 3 4 5 4M17 7h3a2 2 0 0 1 2 2c0 3-3 4-5 4" />,
    play: <path d="M6 4l14 8-14 8V4z" />,
    list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />,
    eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
    star: <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-7z" />,
    pencil: <path d="M4 20h4l11-11-4-4L4 16v4zM14 5l4 4" />,
    spark: <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />,
    flag: <path d="M5 21V5a4 4 0 0 1 8 0v0a4 4 0 0 0 8 0v9a4 4 0 0 1-8 0v0a4 4 0 0 0-8 0z" />
  };
  return (
    <svg className={"ico " + className} width={size} height={size} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {paths[name] || null}
    </svg>
  );
};

/* Auth screen — login + registration with role tabs */
const AuthScreen = ({ onLogin }) => {
  const [mode, setMode] = useState("login"); // login | register
  const [role, setRole] = useState("student");
  const [form, setForm] = useState({ email: "", password: "", name: "", group: "10-А" });
  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setErr("Заполните email и пароль"); return; }
    if (mode === "register" && !form.name) { setErr("Укажите имя"); return; }
    const display = form.name || form.email.split("@")[0];
    onLogin({
      role,
      name: display,
      email: form.email,
      group: form.group,
      initials: display.split(" ").map(s => s[0]).join("").slice(0,2).toUpperCase()
    });
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36, fontSize: 18, fontWeight: 700 }}>
            <div className="brand-mark">M</div>
            marishka.edu
          </div>
          <h2>Учись в своём ритме. Проверяй прогресс. Расти.</h2>
          <p>Платформа онлайн-обучения с интерактивной теорией, тестами и подробной аналитикой для преподавателей.</p>
        </div>
        <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 24, opacity: 0.85, fontSize: 14 }}>
          <div><div style={{ fontSize: 28, fontWeight: 800 }}>7</div>предметов</div>
          <div><div style={{ fontSize: 28, fontWeight: 800 }}>120+</div>уроков</div>
          <div><div style={{ fontSize: 28, fontWeight: 800 }}>4.9★</div>оценка</div>
        </div>
        <div className="auth-blob" style={{ width: 400, height: 400, background: "#ff6fa3", top: "-100px", right: "-100px" }} />
        <div className="auth-blob" style={{ width: 300, height: 300, background: "#ffb547", bottom: "-80px", left: "-60px" }} />
      </div>

      <div className="auth-form-wrap">
        <form className="auth-form fade-in" onSubmit={submit}>
          <h1>{mode === "login" ? "С возвращением!" : "Создать аккаунт"}</h1>
          <p className="lead">{mode === "login" ? "Войдите, чтобы продолжить обучение" : "Заполните данные, чтобы начать"}</p>

          <div className="role-tabs">
            <button type="button" className={"role-tab " + (role === "student" ? "active" : "")} onClick={() => setRole("student")}>
              <Icon name="grad" size={16} /> Студент
            </button>
            <button type="button" className={"role-tab " + (role === "teacher" ? "active" : "")} onClick={() => setRole("teacher")}>
              <Icon name="user" size={16} /> Преподаватель
            </button>
          </div>

          <div className="col" style={{ gap: 14 }}>
            {mode === "register" && (
              <div className="field">
                <label>Имя и фамилия</label>
                <input className="input" placeholder="Мария Иванова"
                  value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </div>
            )}
            <div className="field">
              <label>Email</label>
              <input className="input" type="email" placeholder="you@example.com"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field">
              <label>Пароль</label>
              <input className="input" type="password" placeholder="••••••••"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            {mode === "register" && role === "student" && (
              <div className="field">
                <label>Класс / группа</label>
                <select className="select" value={form.group} onChange={e => setForm({ ...form, group: e.target.value })}>
                  <option>10-А</option>
                  <option>10-Б</option>
                  <option>11-А</option>
                  <option>11-Б</option>
                </select>
              </div>
            )}
            {err && <div className="badge danger" style={{ alignSelf: "flex-start" }}>{err}</div>}

            <button className="btn primary lg full" type="submit" style={{ marginTop: 8 }}>
              {mode === "login" ? "Войти" : "Создать аккаунт"} <Icon name="arrow" size={16} />
            </button>

            <div style={{ textAlign: "center", color: "var(--ink-500)", fontSize: 14, marginTop: 6 }}>
              {mode === "login" ? "Ещё нет аккаунта?" : "Уже есть аккаунт?"}{" "}
              <a href="#" onClick={e => { e.preventDefault(); setMode(mode === "login" ? "register" : "login"); setErr(""); }}>
                {mode === "login" ? "Зарегистрироваться" : "Войти"}
              </a>
            </div>

            <div style={{ marginTop: 14, padding: 12, background: "var(--ink-50)", borderRadius: 10, fontSize: 12.5, color: "var(--ink-500)", textAlign: "center" }}>
              💡 демо-режим: введите любой email и пароль, чтобы войти как {role === "student" ? "студент" : "преподаватель"}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

Object.assign(window, { Icon, AuthScreen });
