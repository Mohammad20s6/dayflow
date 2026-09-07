import { ArrowLeft, ArrowDown, Sparkles, Clock3, Zap } from "lucide-react";

import styles from "./Hero.module.css";

const BLOCKS = [
  { start: "8", width: 12, label: "اجتماع الصباح", type: "task" },
  { start: "21", width: 8, label: "مهمة تركيز", type: "task" },
  { start: "34", width: 14, label: "3 ساعات فاضية", type: "free" },
  { start: "50", width: 10, label: "دراسة", type: "task" },
  { start: "62", width: 16, label: "مشروع شخصي", type: "task" },
  { start: "80", width: 9, label: "رياضة", type: "task" },
];

export default function Hero() {
  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className={styles.hero}>
      {" "}
      <div className={styles.backgroundGlow} /> <div className={styles.grid} />
      <div className={styles.copy}>
        <div className={styles.badge}>
          <span className={styles.badgeIcon}>
            <Sparkles size={14} />
          </span>

          <span>إدارة يومك أصبحت أذكى</span>

          <span className={styles.badgeDot} />
        </div>

        <h1 className={styles.title}>
          يومك مرسوم أمامك بالكامل
          <br />
          {/* <span className={styles.titleAccent}>أمامك بالكامل</span> */}
        </h1>

        <p className={styles.subtitle}>
          DayFlow بيجدول مهامك وبيحسب أوقات فراغك تلقائياً — عشان ما تضيع دقيقة
          وانت عم تخطط ليومك مع
        </p>

        <div className={styles.ctaRow}>
          <button
            type="button"
            className={styles.primaryBtn}
            onClick={() => scrollTo("#auth")}
          >
            <span>ابدأ مجاناً</span>
            <span className={styles.btnIcon}>
              <ArrowLeft size={17} />
            </span>
          </button>

          <button
            type="button"
            className={styles.ghostBtn}
            onClick={() => scrollTo("#features")}
          >
            <span>شاهد كيف يعمل</span>
            <ArrowDown size={16} />
          </button>
        </div>

        <div className={styles.trustRow}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <Clock3 size={14} />
            </span>
            <span>نظّم وقتك</span>
          </div>

          <span className={styles.trustDivider} />

          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>
              <Zap size={14} />
            </span>
            <span>خطط بذكاء</span>
          </div>
        </div>
      </div>
      <div className={styles.timelineSection}>
        <div className={styles.timelineHeader}>
          <div className={styles.timelineTitle}>
            <span className={styles.liveDot} />
            <span>مخطط يومك</span>
          </div>

          <span className={styles.timelineHint}>24 ساعة</span>
        </div>

        <div className={styles.timelineWrap}>
          <div className={styles.timelineLabels}>
            <span>00:00</span>
            <span>08:00</span>
            <span>16:00</span>
            <span>24:00</span>
          </div>

          <div className={styles.timeline}>
            <div className={styles.timelineGrid}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <div className={styles.currentTime}>
              <span className={styles.currentTimeDot} />
            </div>

            {BLOCKS.map((block, index) => (
              <div
                key={block.label}
                className={
                  block.type === "free" ? styles.freeBlock : styles.taskBlock
                }
                style={{
                  left: `${block.start}%`,
                  width: `${block.width}%`,
                  animationDelay: `${index * 0.12 + 0.2}s`,
                }}
              >
                <span className={styles.blockShine} />
                <span className={styles.blockLabel}>{block.label}</span>
              </div>
            ))}

            <div className={styles.timelineScan} />
          </div>

          <div className={styles.freeTimeMessage}>
            <span className={styles.freeTimeIcon}>
              <Sparkles size={13} />
            </span>

            <span>
              <strong>وقت فاضي مكتشف</strong>
              <span> — 3 ساعات متاحة لك</span>
            </span>
          </div>
        </div>
      </div>
      {/* <div className={styles.scrollHint}>
        <span>اكتشف DayFlow</span>
        <span className={styles.scrollLine} />
      </div> */}
    </section>
  );
}
