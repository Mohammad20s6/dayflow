import {
  CalendarDays,
  LayoutGrid,
  Tag,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "../../features/ui/uiSlice";

import Logo from "../Logo";

import styles from "./Sidebar.module.css";

const NAV = [
  { icon: CalendarDays, label: "اليوم" },
  { icon: LayoutGrid, label: "كل المهام" },
  { icon: Tag, label: "التصنيفات" },
  { icon: Settings, label: "الإعدادات" },
];

export default function Sidebar() {
  const collapsed = useSelector((state) => state.ui.sidebarCollapsed);

  const dispatch = useDispatch();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo size={26} />

          <span className={styles.wordmark}>DayFlow</span>
        </div>

        <button
          type="button"
          className={styles.collapseBtn}
          onClick={() => dispatch(toggleSidebar())}
          aria-label={
            collapsed ? "فتح القائمة الجانبية" : "تصغير القائمة الجانبية"
          }
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => {
          const Icon = item.icon;

          return (
            <button
              type="button"
              key={item.label}
              className={`${styles.navItem} ${
                item.label === "اليوم" ? styles.active : ""
              }`}
            >
              <Icon size={19} />

              <span className={styles.navLabel}>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
