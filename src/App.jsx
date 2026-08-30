import { useEffect, useState } from "react";
import { supabase } from "./services/supabase";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";

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

  if (checkingSession) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>جاري التحميل...</div>
    );
  }

  if (loadError) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "red" }}>
        صار خطأ: {loadError}
      </div>
    );
  }

  if (!session) return <LandingPage />;

  return <DashboardLayout userEmail={session.user.email} />;
}

export default App;
