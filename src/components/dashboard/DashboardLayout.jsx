import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({ userEmail }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar userEmail={userEmail} />
        <div className={styles.content}>
          <div className={styles.placeholder}>
            📋 منطقة عرض المهام — رح نبنيها يوم 3 (React Query + Supabase)
          </div>
        </div>
      </div>
    </div>
  );
}
