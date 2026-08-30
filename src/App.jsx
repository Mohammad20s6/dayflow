import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import LandingPage from "./pages/LandingPage";
import { LogOut } from "lucide-react";

function App() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
        setCheckingSession(false);
      })
      .catch((err) => {
        console.error("Supabase getSession failed:", err);
        setLoadError(err.message);
        setCheckingSession(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>
      setSession(session),
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (checkingSession) {
    return (
      <div
        style={{ padding: 40, textAlign: "center", fontFamily: "sans-serif" }}
      >
        جاري التحميل...
      </div>
    );
  }

  if (loadError) {
    return (
      <div
        style={{
          padding: 40,
          textAlign: "center",
          fontFamily: "sans-serif",
          color: "red",
        }}
      >
        صار خطأ بالاتصال بـ Supabase: {loadError}
      </div>
    );
  }

  if (!session) return <LandingPage />;

  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <p>أهلاً {session.user.email} 👋</p>
      <button onClick={handleLogout} style={{ marginTop: 12 }}>
        <LogOut size={16} /> تسجيل خروج
      </button>
    </div>
  );
}

export default App;
