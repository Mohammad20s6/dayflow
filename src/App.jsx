import { useAuth } from "./hooks/useAuth";
import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";

function App() {
  const { session, loading, error } = useAuth();

  if (loading)
    return (
      <div style={{ padding: 40, textAlign: "center" }}>جاري التحميل...</div>
    );
  if (error)
    return (
      <div style={{ padding: 40, textAlign: "center", color: "red" }}>
        صار خطأ: {error}
      </div>
    );
  if (!session) return <LandingPage />;

  return (
    <DashboardLayout userId={session.user.id} userEmail={session.user.email} />
  );
}

export default App;
