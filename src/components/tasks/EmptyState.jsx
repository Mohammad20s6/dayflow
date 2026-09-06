import { Plus } from "lucide-react";
import { useDispatch } from "react-redux";

import { openAddTaskModal } from "../../features/ui/uiSlice";

import styles from "./EmptyState.module.css";

export default function EmptyState() {
  const dispatch = useDispatch();

  return (
    <div className={styles.wrap}>
      <div className={styles.illustration} aria-hidden="true">
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          <circle
            cx="60"
            cy="60"
            r="52"
            stroke="var(--border)"
            strokeWidth="2"
          />

          <path
            d="M60 34v26l18 10"
            stroke="var(--sky)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          <circle cx="60" cy="60" r="4" fill="var(--amber)" />
        </svg>
      </div>

      <h3>ما عندك مهام بعد</h3>

      <p>يومك فاضي بالكامل — ضيف أول مهمة وخلي DayFlow يحسبلك وقتك الفاضي.</p>

      <button
        type="button"
        className={styles.cta}
        onClick={() => dispatch(openAddTaskModal())}
      >
        <Plus size={16} />
        <span>أضف مهمة جديدة</span>
      </button>
    </div>
  );
}
