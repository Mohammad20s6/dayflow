import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import styles from "./Navbar.module.css";

const LINKS = [
  { label: "المزايا", href: "#features" },
  { label: "كيف يعمل", href: "#how" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <Logo size={28} />
          <span className={styles.wordmark}>DayFlow</span>
        </div>

        <nav className={styles.links}>
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={styles.link}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <button className={styles.ctaBtn} onClick={() => scrollTo("#auth")}>
            ابدأ الآن
          </button>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="فتح القائمة"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={styles.mobileLink}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
