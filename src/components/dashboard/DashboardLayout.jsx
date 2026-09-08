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
      {" "}
      <Sidebar />{" "}
      <main className={styles.main}>
        {" "}
        <Topbar userEmail={userEmail} />{" "}
        <div className={styles.content}>
          {" "}
          <div className={styles.contentInner}>
            {" "}
            {activeView === "today" && (
              <section className={styles.dashboardView}>
                {" "}
                <TodayTimeline userId={userId} />{" "}
                <div className={styles.tasksSection}>
                  {" "}
                  <div className={styles.sectionHeading}>
                    {" "}
                    <div>
                      {" "}
                      <span className={styles.sectionEyebrow}>
                        {" "}
                        قائمة اليوم{" "}
                      </span>{" "}
                      <h2 className={styles.sectionTitle}>
                        {" "}
                        مهامك اليوم{" "}
                      </h2>{" "}
                    </div>{" "}
                  </div>{" "}
                  <TaskList userId={userId} onlyToday />{" "}
                </div>{" "}
              </section>
            )}{" "}
            {activeView === "all" && (
              <section className={styles.dashboardView}>
                {" "}
                <div className={styles.pageHeading}>
                  {" "}
                  <div>
                    {" "}
                    <span className={styles.sectionEyebrow}>
                      {" "}
                      إدارة المهام{" "}
                    </span>{" "}
                    <h1 className={styles.pageTitle}>كل المهام</h1>{" "}
                    <p className={styles.pageDescription}>
                      {" "}
                      كل مهامك في مكان واحد، رتّبها وأنجزها بسهولة.{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                <div className={styles.tasksSection}>
                  {" "}
                  <TaskList userId={userId} />{" "}
                </div>{" "}
              </section>
            )}{" "}
            {activeView === "categories" && (
              <section className={styles.dashboardView}>
                {" "}
                <CategoriesView userId={userId} />{" "}
              </section>
            )}{" "}
            {activeView === "settings" && (
              <section className={styles.dashboardView}>
                {" "}
                <SettingsView userId={userId} userEmail={userEmail} />{" "}
              </section>
            )}{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
      <TaskModal userId={userId} />{" "}
    </div>
  );
}
