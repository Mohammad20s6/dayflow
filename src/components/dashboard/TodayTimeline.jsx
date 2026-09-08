import { Clock3, Sparkles } from "lucide-react";
import { useTasks } from "../../features/tasks/tasksQueries";
import { useFreeSlots } from "../../hooks/useFreeSlots";
import Timeline from "../timeline/Timeline";
import styles from "./TodayTimeline.module.css";
function isToday(dateStr) {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}
export default function TodayTimeline({ userId }) {
  const { data: tasks, isLoading } = useTasks(userId, {
    category: "all",
    status: "all",
  });
  const todayTasks = (tasks || []).filter((task) => isToday(task.start_time));
  const { freeSlots, totalFreeMinutes } = useFreeSlots(todayTasks);
  const freeHours = Math.floor(totalFreeMinutes / 60);
  const freeMinutes = totalFreeMinutes % 60;
  return (
    <section className={styles.wrap}>
      {" "}
      <div className={styles.header}>
        {" "}
        <div className={styles.titleGroup}>
          {" "}
          <div className={styles.iconBox}>
            {" "}
            <Clock3 size={18} />{" "}
          </div>{" "}
          <div>
            {" "}
            <span className={styles.eyebrow}>نظرة اليوم</span>{" "}
            <h2 className={styles.title}>خط يومك</h2>{" "}
          </div>{" "}
        </div>{" "}
        <div className={styles.freeBadge}>
          {" "}
          <Sparkles size={14} />{" "}
          <span>
            {" "}
            {freeHours > 0 && `${freeHours} ساعة `}{" "}
            {freeMinutes > 0 && `${freeMinutes} دقيقة `} فاضية{" "}
          </span>{" "}
        </div>{" "}
      </div>{" "}
      <div className={styles.timelineCard}>
        {" "}
        {isLoading ? (
          <div className={styles.loading}>
            {" "}
            <div className={styles.spinner} />{" "}
            <span>جاري تجهيز خط يومك...</span>{" "}
          </div>
        ) : (
          <Timeline>
            {" "}
            <Timeline.Labels />{" "}
            <Timeline.Track>
              {" "}
              {todayTasks.map((task) => (
                <Timeline.TaskBlock key={task.id} task={task} />
              ))}{" "}
              {freeSlots.map((slot, index) => (
                <Timeline.FreeBlock key={index} slot={slot} />
              ))}{" "}
            </Timeline.Track>{" "}
          </Timeline>
        )}
        {!isLoading && todayTasks.length === 0 && (
          <div className={styles.emptyHint}>
            <span> يومك مفتوح بالكامل — أضف أول مهمة وابدأ التخطيط. </span>
          </div>
        )}
      </div>
    </section>
  );
}
