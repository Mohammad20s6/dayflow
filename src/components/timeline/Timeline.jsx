import { createContext, useContext } from "react";
import styles from "./Timeline.module.css";

const TimelineContext = createContext(null);

function useTimelineContext() {
  const ctx = useContext(TimelineContext);
  if (!ctx) throw new Error("مكونات Timeline.* لازم تكون جوا <Timeline>");
  return ctx;
}

function Timeline({ dayStartHour = 7, dayEndHour = 23, children }) {
  const totalMinutes = (dayEndHour - dayStartHour) * 60;

  const toPercent = (date) => {
    const d = new Date(date);
    const minutesFromStart =
      (d.getHours() - dayStartHour) * 60 + d.getMinutes();
    return Math.min(100, Math.max(0, (minutesFromStart / totalMinutes) * 100));
  };

  return (
    <TimelineContext.Provider value={{ dayStartHour, dayEndHour, toPercent }}>
      <div className={styles.timeline}>{children}</div>
    </TimelineContext.Provider>
  );
}

function Labels() {
  const { dayStartHour, dayEndHour } = useTimelineContext();
  const hours = [];
  for (let h = dayStartHour; h <= dayEndHour; h += 4) hours.push(h);
  return (
    <div className={styles.labels}>
      {hours.map((h) => (
        <span key={h}>{String(h).padStart(2, "0")}:00</span>
      ))}
    </div>
  );
}

function Track({ children }) {
  return <div className={styles.track}>{children}</div>;
}
function TaskBlock({ task }) {
  const { toPercent } = useTimelineContext();
  const left = toPercent(task.start_time);
  const width = toPercent(task.end_time) - left;
  return (
    <div
      className={`${styles.taskBlock} ${task.is_completed ? styles.taskBlockDone : ""}`}
      style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
      title={task.title}
    >
      <span>{task.title}</span>
    </div>
  );
}

function FreeBlock({ slot }) {
  const { toPercent } = useTimelineContext();
  const left = toPercent(slot.start);
  const width = toPercent(slot.end) - left;
  const minutes = Math.round((slot.end - slot.start) / 60000);
  const label =
    minutes >= 60
      ? `${(minutes / 60).toFixed(1)} ساعة فاضية`
      : `${minutes} د فاضية`;
  return (
    <div
      className={styles.freeBlock}
      style={{ left: `${left}%`, width: `${Math.max(width, 2)}%` }}
    >
      <span>{label}</span>
    </div>
  );
}

Timeline.Labels = Labels;
Timeline.Track = Track;
Timeline.TaskBlock = TaskBlock;
Timeline.FreeBlock = FreeBlock;

export default Timeline;
