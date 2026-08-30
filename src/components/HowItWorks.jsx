import { UserPlus, ListPlus, Sparkles, CalendarCheck } from "lucide-react";
import styles from "./HowItWorks.module.css";

const STEPS = [
  {
    icon: UserPlus,
    title: "أنشئ حسابك",
    text: "سجّل بإيميلك بثواني، وابدأ فوراً بدون أي تعقيد.",
  },
  {
    icon: ListPlus,
    title: "أضف مهامك",
    text: "حدد مهمة، وقت البداية والنهاية، والتصنيف — بسهولة.",
  },
  {
    icon: Sparkles,
    title: "خلي DayFlow يحسبلك",
    text: "بيظهرلك تلقائياً كل فجوة وقت فاضية بيومك.",
  },
  {
    icon: CalendarCheck,
    title: "نظّم يومك بثقة",
    text: "اعرف بالضبط وين وقتك رايح، ووين فيك تضيف جديد.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className={styles.section}>
      <h2 className={styles.heading}>كيف يعمل</h2>
      <p className={styles.subheading}>
        أربع خطوات، وتصير مسيطر على وقتك بالكامل
      </p>

      <div className={styles.flow}>
        <div className={styles.track}>
          <div className={styles.flowDot} />
        </div>

        {STEPS.map((s, i) => {
          const Icon = s.icon;
          return (
            <div
              key={i}
              className={styles.step}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className={styles.circle}>
                <Icon size={24} color="var(--sky)" />
                <span className={styles.badge}>{i + 1}</span>
              </div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.stepText}>{s.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
