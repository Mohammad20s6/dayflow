import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TodayTimeline from "./TodayTimeline";
import TaskList from "../../features/tasks/TaskList";
import TaskModal from "../../features/tasks/TaskModal";
import CategoriesView from "../../features/categories/CategoriesView";
import SettingsView from "../../features/profile/SettingsView";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({ userId, userEmail }) {
  const activeView = useSelector((s) => s.ui.activeView);

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar userEmail={userEmail} />
        <div className={styles.content}>
          {activeView === "today" && (
            <>
              <TodayTimeline userId={userId} />
              <TaskList userId={userId} onlyToday />
            </>
          )}
          {activeView === "all" && <TaskList userId={userId} />}
          {activeView === "categories" && <CategoriesView userId={userId} />}
          {activeView === "settings" && (
            <SettingsView userId={userId} userEmail={userEmail} />
          )}
        </div>
      </div>
      <TaskModal userId={userId} />
    </div>
  );
}
