import { ArrowLeft } from "lucide-react";
import styles from "./Hero.module.css";

const BLOCKS = [
  { start: "8", width: 12, label: "اجتماع الصباح" },
  { start: "21", width: 8, label: "مهمة تركيز" },
  { start: "34", gap: true, width: 14, label: "3 ساعات فاضية" },
  { start: "50", width: 10, label: "دراسة" },
  { start: "62", width: 16, label: "مشروع شخصي" },
  { start: "80", width: 9, label: "رياضة" },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <h1 className={styles.title}>
          يومك مرسوم أمامك
          <br />
          <span className={styles.accent}>وقتك الفاضي، محجوز لك</span>
        </h1>
        <p className={styles.subtitle}>
          بيجدول مهامك وبيحسب أوقات فراغك تلقائياً — عشان ما تضيع دقيقة وانت عم
          تخطط ليومك DayFlow
        </p>
        <div className={styles.ctaRow}>
          <button
            className={styles.primaryBtn}
            onClick={() =>
              document
                .querySelector("#auth")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            ابدأ مجاناً <ArrowLeft size={16} />
          </button>
          <button
            className={styles.ghostBtn}
            onClick={() =>
              document
                .querySelector("#features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            شاهد كيف يعمل
          </button>
        </div>
      </div>

      <div className={styles.timelineWrap}>
        <div className={styles.timelineLabels}>
          <span>00:00</span>
          <span>08:00</span>
          <span>16:00</span>
          <span>24:00</span>
        </div>
        <div className={styles.timeline}>
          {BLOCKS.map((b, i) => (
            <div
              key={i}
              className={b.gap ? styles.freeBlock : styles.taskBlock}
              style={{
                left: `${b.start}%`,
                width: `${b.width}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              <span className={styles.blockLabel}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
