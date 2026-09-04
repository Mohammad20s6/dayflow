import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import TodayTimeline from "./TodayTimeline";
import TaskList from "../../features/tasks/TaskList";
import TaskModal from "../../features/tasks/TaskModal";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({ userId, userEmail }) {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.main}>
        <Topbar userEmail={userEmail} />
        <div className={styles.content}>
          <TodayTimeline userId={userId} />
          <TaskList userId={userId} />
        </div>
      </div>
      <TaskModal userId={userId} />
    </div>
  );
}
