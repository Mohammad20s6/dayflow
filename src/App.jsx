import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import AuthForm from "./features/auth/AuthForm";
import { LogOut } from "lucide-react";

function App() {
  const [session, setSession] = useState(null);
  const [checkingSession, setCheckingSession] = useState(true);

  useEffect(() => {
    // فحص الجلسة الحالية أول ما يفتح التطبيق
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCheckingSession(false);
    });

    // الاستماع لأي تغيير بحالة تسجيل الدخول (دخول/خروج) بشكل حي
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

  if (checkingSession) return null; // أو مؤشر تحميل بسيط لاحقاً

  if (!session) return <AuthForm />;

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
