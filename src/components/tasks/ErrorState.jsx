import { RefreshCw, TriangleAlert } from "lucide-react";

import styles from "./ErrorState.module.css";

export default function ErrorState({ onRetry }) {
  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.icon} aria-hidden="true">
        <TriangleAlert size={19} />
      </div>

      <div className={styles.content}>
        <strong>تعذر تحميل المهام</strong>

        <p>ممكن يكون فيه مشكلة اتصال مؤقتة. جرب المحاولة مرة ثانية.</p>
      </div>

      <button type="button" className={styles.retryBtn} onClick={onRetry}>
        <RefreshCw size={15} />
        <span>إعادة المحاولة</span>
      </button>
    </div>
  );
}
