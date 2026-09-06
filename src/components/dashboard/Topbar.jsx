import { Search, LogOut, Plus } from "lucide-react";
import { useDispatch } from "react-redux";

import { openAddTaskModal } from "../../features/ui/uiSlice";

import ThemeToggle from "../ThemeToggle";

import { supabase } from "../../services/supabase";

import styles from "./Topbar.module.css";

export default function Topbar({ userEmail }) {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.searchBox}>
        <Search size={16} className={styles.searchIcon} />

        <input
          type="search"
          placeholder="بحث بالمهام..."
          aria-label="بحث بالمهام"
        />
      </div>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.addBtn}
          onClick={() => dispatch(openAddTaskModal())}
        >
          <Plus size={16} />
          <span className={styles.addBtnText}>مهمة جديدة</span>
        </button>

        <ThemeToggle />

        <div className={styles.userMenu}>
          <span className={styles.userEmail}>{userEmail}</span>

          <button
            type="button"
            className={styles.logoutBtn}
            onClick={handleLogout}
            aria-label="تسجيل خروج"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
