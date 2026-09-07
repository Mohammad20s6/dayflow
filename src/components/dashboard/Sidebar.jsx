import {
  CalendarDays,
  LayoutGrid,
  Tag,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, setActiveView } from "../../features/ui/uiSlice";
import Logo from "../Logo";
import styles from "./Sidebar.module.css";

const NAV = [
  { key: "today", icon: CalendarDays, label: "اليوم" },
  { key: "all", icon: LayoutGrid, label: "كل المهام" },
  { key: "categories", icon: Tag, label: "التصنيفات" },
  { key: "settings", icon: Settings, label: "الإعدادات" },
];

export default function Sidebar() {
  const collapsed = useSelector((s) => s.ui.sidebarCollapsed);
  const activeView = useSelector((s) => s.ui.activeView);
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
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              className={`${styles.navItem} ${activeView === item.key ? styles.active : ""}`}
              onClick={() => dispatch(setActiveView(item.key))}
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
