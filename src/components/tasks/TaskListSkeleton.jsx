import styles from "./TaskListSkeleton.module.css";

export default function TaskListSkeleton({ count = 4 }) {
  return (
    <div className={styles.list} role="status" aria-label="جاري تحميل المهام">
      {Array.from({ length: count }).map((_, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.circle} />

          <div className={styles.lines}>
            <div className={styles.lineShort} />
            <div className={styles.lineLong} />
          </div>

          <div className={styles.actions}>
            <div className={styles.action} />
            <div className={styles.action} />
          </div>
        </div>
      ))}

      <span className={styles.srOnly}>جاري تحميل مهامك...</span>
    </div>
  );
}
