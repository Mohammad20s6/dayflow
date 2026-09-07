import { useState } from "react";
import { Search, LogOut, Plus, AlertTriangle, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { openAddTaskModal, setSearchQuery } from "../../features/ui/uiSlice";

import ThemeToggle from "../ThemeToggle";
import { supabase } from "../../services/supabase";
import styles from "./Topbar.module.css";

import Logo from "../Logo";

export default function Topbar({ userEmail }) {
  const dispatch = useDispatch();

  const searchQuery = useSelector((state) => state.ui.searchQuery);

  const [logoutOpen, setLogoutOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error);
      setLoggingOut(false);
      return;
    }

    setLogoutOpen(false);
  };

  const handleOpenLogout = () => {
    if (!loggingOut) {
      setLogoutOpen(true);
    }
  };

  const handleCloseLogout = () => {
    if (!loggingOut) {
      setLogoutOpen(false);
    }
  };

  return (
    <>
      <header className={styles.topbar}>
        {/* Logo - يظهر على الموبايل */}
        <div className={styles.mobileBrand}>
          <Logo />
          <span>DayFlow</span>
        </div>
        {/* <div className={styles.mobileBrand} aria-label="DayFlow">
          <div className={styles.brandMark}>
            <span />
            <span />
            <span />
          </div>

          <span className={styles.brandName}>DayFlow</span>
        </div> */}

        {/* البحث */}
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />

          <input
            type="search"
            placeholder="بحث بالمهام..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            aria-label="البحث في المهام"
          />
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.addBtn}
            onClick={() => dispatch(openAddTaskModal())}
          >
            <Plus size={16} strokeWidth={2.5} />

            <span className={styles.addBtnText}>مهمة جديدة</span>
          </button>

          <div className={styles.themeWrapper}>
            <ThemeToggle />
          </div>

          <div className={styles.userMenu}>
            <span className={styles.userEmail}>{userEmail}</span>

            <button
              type="button"
              className={styles.logoutBtn}
              onClick={handleOpenLogout}
              aria-label="تسجيل خروج"
              title="تسجيل خروج"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Logout Confirmation */}
      {logoutOpen && (
        <div
          className={styles.logoutOverlay}
          onClick={handleCloseLogout}
          role="presentation"
        >
          <div
            className={styles.logoutDialog}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-title"
          >
            <button
              type="button"
              className={styles.dialogClose}
              onClick={handleCloseLogout}
              disabled={loggingOut}
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>

            <div className={styles.dialogIcon}>
              <AlertTriangle size={22} />
            </div>

            <div className={styles.dialogContent}>
              <h2 id="logout-title">تسجيل الخروج؟</h2>

              <p>
                هل أنت متأكد أنك تريد تسجيل الخروج من حسابك؟
                <br />
                يمكنك العودة وتسجيل الدخول في أي وقت
              </p>
            </div>

            <div className={styles.dialogActions}>
              <button
                type="button"
                className={styles.cancelLogout}
                onClick={handleCloseLogout}
                disabled={loggingOut}
              >
                إلغاء
              </button>

              <button
                type="button"
                className={styles.confirmLogout}
                onClick={handleLogout}
                disabled={loggingOut}
              >
                <LogOut size={16} />

                {loggingOut ? "جاري الخروج..." : "تسجيل الخروج"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
