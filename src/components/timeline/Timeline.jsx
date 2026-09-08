import { createContext, useContext } from "react";

import styles from "./Timeline.module.css";

const TimelineContext = createContext(null);

function useTimelineContext() {
  const context = useContext(TimelineContext);

  if (!context) {
    throw new Error("مكونات Timeline لازم تكون جوا <Timeline>");
  }

  return context;
}

function Timeline({ dayStartHour = 7, dayEndHour = 23, children }) {
  const totalMinutes = (dayEndHour - dayStartHour) * 60;

  const toPercent = (date) => {
    const d = new Date(date);

    const minutesFromStart =
      (d.getHours() - dayStartHour) * 60 + d.getMinutes() + d.getSeconds() / 60;

    return Math.min(100, Math.max(0, (minutesFromStart / totalMinutes) * 100));
  };

  return (
    <TimelineContext.Provider
      value={{
        dayStartHour,
        dayEndHour,
        totalMinutes,
        toPercent,
      }}
    >
      <div className={styles.timeline}>{children}</div>
    </TimelineContext.Provider>
  );
}

function Labels() {
  const { dayStartHour, dayEndHour } = useTimelineContext();

  const hours = [];

  for (let hour = dayStartHour; hour <= dayEndHour; hour += 2) {
    hours.push(hour);
  }

  return (
    <div className={styles.labels}>
      {hours.map((hour) => (
        <span
          key={hour}
          className={
            hour === dayStartHour || hour === dayEndHour ? styles.edgeLabel : ""
          }
        >
          {String(hour).padStart(2, "0")}:00
        </span>
      ))}
    </div>
  );
}

function Track({ children }) {
  const { dayStartHour, dayEndHour, toPercent } = useTimelineContext();

  const gridLines = [];

  for (let hour = dayStartHour; hour <= dayEndHour; hour += 2) {
    gridLines.push(
      <span
        key={hour}
        className={styles.gridLine}
        style={{
          left: `${toPercent(new Date(2000, 0, 1, hour, 0, 0))}%`,
        }}
      />,
    );
  }

  const now = new Date();
  const isSameDay = now.toDateString() === new Date().toDateString();

  const nowPercent = isSameDay ? toPercent(now) : null;

  return (
    <div className={styles.track}>
      <div className={styles.grid}>{gridLines}</div>

      {nowPercent !== null && nowPercent > 0 && nowPercent < 100 && (
        <div
          className={styles.nowLine}
          style={{
            left: `${nowPercent}%`,
          }}
          aria-hidden="true"
        >
          <span className={styles.nowDot} />
        </div>
      )}

      {children}
    </div>
  );
}

function TaskBlock({ task }) {
  const { toPercent } = useTimelineContext();

  const start = toPercent(task.start_time);
  const end = toPercent(task.end_time);

  const width = Math.max(end - start, 2.5);

  return (
    <div
      className={`${styles.taskBlock} ${
        task.is_completed ? styles.taskBlockDone : ""
      }`}
      style={{
        left: `${start}%`,
        width: `${Math.min(width, 100 - start)}%`,
        "--block-color": task.categories?.color || "var(--sky)",
      }}
      title={task.title}
    >
      <span className={styles.blockAccent} />

      <div className={styles.taskBlockContent}>
        <span className={styles.taskBlockTitle}>{task.title}</span>

        <span className={styles.taskBlockTime}>
          {new Date(task.start_time).toLocaleTimeString("ar", {
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
          })}
        </span>
      </div>
    </div>
  );
}

function FreeBlock({ slot }) {
  const { toPercent } = useTimelineContext();

  const start = toPercent(slot.start);
  const end = toPercent(slot.end);

  const width = Math.max(end - start, 2.5);

  const minutes = Math.round((slot.end - slot.start) / 60000);

  const label =
    minutes >= 60 ? `${(minutes / 60).toFixed(1)} س` : `${minutes} د`;

  return (
    <div
      className={styles.freeBlock}
      style={{
        left: `${start}%`,
        width: `${Math.min(width, 100 - start)}%`,
      }}
      title={`${minutes} دقيقة متاحة`}
    >
      <span className={styles.freePattern} />

      <span className={styles.freeContent}>
        <span className={styles.freeIcon}>+</span>

        <span>{label}</span>
      </span>
    </div>
  );
}

Timeline.Labels = Labels;
Timeline.Track = Track;
Timeline.TaskBlock = TaskBlock;
Timeline.FreeBlock = FreeBlock;

export default Timeline;
