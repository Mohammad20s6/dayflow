import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark",
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("dayflow-theme", theme);
  }, [theme]);

  return (
    <button
      className={styles.toggle}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="تبديل الوضع الليلي/النهاري"
    >
      {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
