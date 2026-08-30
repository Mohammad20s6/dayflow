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
  const collapsed = useSelector((s) => s.ui.sidebarCollapsed);
  const dispatch = useDispatch();

  return (
    <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ""}`}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <Logo size={26} />
          {!collapsed && <span className={styles.wordmark}>DayFlow</span>}
        </div>
        <button
          className={styles.collapseBtn}
          onClick={() => dispatch(toggleSidebar())}
        >
          {collapsed ? (
            <PanelLeftOpen size={18} />
          ) : (
            <PanelLeftClose size={18} />
          )}
        </button>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item, i) => {
          const Icon = item.icon;
          return (
            <button
              key={i}
              className={`${styles.navItem} ${i === 0 ? styles.active : ""}`}
            >
              <Icon size={19} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
