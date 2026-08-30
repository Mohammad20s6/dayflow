import { CloudCog, CalendarClock, LayoutGrid } from "lucide-react";
import styles from "./Features.module.css";

const FEATURES = [
  {
    icon: CloudCog,
    title: "تزامن سحابي فوري",
    text: "مهامك محفوظة ومتزامنة لحظياً عبر أي جهاز، مع تسجيل دخول آمن.",
  },
  {
    icon: CalendarClock,
    title: "اكتشاف الوقت الفاضي تلقائياً",
    text: "بمجرد ما تضيف مهامك، DayFlow بيحسبلك الفجوات الفاضية بيومك مباشرة.",
  },
  {
    icon: LayoutGrid,
    title: "واجهة نظيفة ومتجاوبة",
    text: "تصميم مريح للعين وسريع الاستخدام على الموبايل والحاسوب على حد سواء.",
  },
];

export default function Features() {
  return (
    <section id="features" className={styles.features}>
      <h2 className={styles.heading}>ليش DayFlow</h2>
      <div className={styles.grid}>
        {FEATURES.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={i} className={styles.card}>
              <div className={styles.iconWrap}>
                <Icon size={22} color="var(--sky)" />
              </div>
              <h3 className={styles.cardTitle}>{f.title}</h3>
              <p className={styles.cardText}>{f.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
