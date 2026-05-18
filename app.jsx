/* global React, ReactDOM */
const { useState, useEffect } = React;

const STORAGE_KEY = "marishka.session.v1";
const PROGRESS_KEY = "marishka.progress.v1";

const App = () => {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; }
    catch { return null; }
  });
  const [route, setRoute] = useState({ page: null });
  const [progress, setProgress] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || { lessons: {}, tests: {}, streak: 5 }; }
    catch { return { lessons: {}, tests: {}, streak: 5 }; }
  });

  // Set default route based on role
  useEffect(() => {
    if (user && !route.page) {
      setRoute({ page: user.role === "student" ? "dashboard" : "t-dashboard" });
    }
  }, [user, route.page]);

  const persistUser = (u) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };
  const persistProgress = (p) => {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
    setProgress(p);
  };

  const navigate = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const markLessonDone = (lessonId) => {
    const newProgress = { ...progress, lessons: { ...progress.lessons, [lessonId]: true } };
    persistProgress(newProgress);
  };
  const saveTestResult = (lessonId, result) => {
    const newProgress = {
      ...progress,
      lessons: { ...progress.lessons, [lessonId]: true },
      tests: { ...progress.tests, [lessonId]: result }
    };
    persistProgress(newProgress);
  };

  const onLogout = () => {
    persistUser(null);
    setRoute({ page: null });
  };

  if (!user) {
    return <window.AuthScreen onLogin={persistUser} />;
  }

  const renderPage = () => {
    const p = route.page;
    if (user.role === "student") {
      if (p === "dashboard") return <window.StudentDashboard user={user} navigate={navigate} progress={progress} />;
      if (p === "subjects") return <window.SubjectsList navigate={navigate} progress={progress} />;
      if (p === "subject") return <window.SubjectDetail subjectId={route.subjectId} navigate={navigate} progress={progress} />;
      if (p === "lesson") return <window.LessonReader subjectId={route.subjectId} lessonId={route.lessonId} navigate={navigate} progress={progress} markLessonDone={markLessonDone} />;
      if (p === "quiz") return <window.Quiz subjectId={route.subjectId} lessonId={route.lessonId} navigate={navigate} saveTestResult={saveTestResult} />;
      if (p === "progress") return <window.StudentProgress progress={progress} />;
      if (p === "achievements") return <window.Achievements progress={progress} />;
      if (p === "profile") return <window.StudentProfile user={user} progress={progress} onLogout={onLogout} />;
      return <window.StudentDashboard user={user} navigate={navigate} progress={progress} />;
    } else {
      if (p === "t-dashboard") return <window.TeacherDashboard user={user} navigate={navigate} />;
      if (p === "t-students") return <window.TeacherStudents navigate={navigate} />;
      if (p === "t-student") return <window.TeacherStudentDetail studentId={route.studentId} navigate={navigate} />;
      if (p === "t-courses") return <window.TeacherCourses navigate={navigate} route={route} />;
      if (p === "t-tests") return <window.TeacherTests />;
      if (p === "t-analytics") return <window.TeacherAnalytics />;
      return <window.TeacherDashboard user={user} navigate={navigate} />;
    }
  };

  return (
    <div className="app-shell">
      <window.Sidebar user={user} route={route} navigate={navigate} onLogout={onLogout} />
      <main className="main">{renderPage()}</main>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
