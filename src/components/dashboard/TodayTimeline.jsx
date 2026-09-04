import { useTasks } from "../../features/tasks/tasksQueries";
import { useFreeSlots } from "../../hooks/useFreeSlots";
import Timeline from "../timeline/Timeline";
import styles from "./TodayTimeline.module.css";

function isToday(dateStr) {
  return new Date(dateStr).toDateString() === new Date().toDateString();
}

export default function TodayTimeline({ userId }) {
  const { data: tasks } = useTasks(userId, { category: "all", status: "all" });
  const todayTasks = (tasks || []).filter((t) => isToday(t.start_time));
  const { freeSlots, totalFreeMinutes } = useFreeSlots(todayTasks);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h3>خط يومك</h3>
        <span className={styles.freeBadge}>
          {(totalFreeMinutes / 60).toFixed(1)} ساعة فاضية اليوم
        </span>
      </div>
      <Timeline>
        <Timeline.Labels />
        <Timeline.Track>
          {todayTasks.map((t) => (
            <Timeline.TaskBlock key={t.id} task={t} />
          ))}
          {freeSlots.map((s, i) => (
            <Timeline.FreeBlock key={i} slot={s} />
          ))}
        </Timeline.Track>
      </Timeline>
    </div>
  );
}
