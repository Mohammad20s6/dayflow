import { useState } from "react";
import { Mail, Lock, LogIn, UserPlus, Loader2 } from "lucide-react";
import { supabase } from "../../services/supabase";
import styles from "./AuthForm.module.css";

export default function AuthForm() {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);
    setLoading(true);

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (mode === "signup") {
      setInfoMessage(
        "تم إنشاء الحساب. تحقق من بريدك الإلكتروني إذا كان التفعيل مطلوباً.",
      );
    }
    // بحالة النجاح بالـ login، onAuthStateChange بـ App.jsx رح يمسك التغيير تلقائياً
  };

  return (
    <div className={styles.card}>
      <h1 className={styles.title}>DayFlow</h1>
      <p className={styles.subtitle}>
        {mode === "login" ? "سجّل دخولك لمتابعة جدولك" : "أنشئ حساب جديد"}
      </p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <Mail size={18} className={styles.icon} />
          <input
            type="email"
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <Lock size={18} className={styles.icon} />
          <input
            type="password"
            placeholder="كلمة المرور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}
        {infoMessage && <p className={styles.info}>{infoMessage}</p>}

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? (
            <Loader2 size={18} className={styles.spinner} />
          ) : mode === "login" ? (
            <LogIn size={18} />
          ) : (
            <UserPlus size={18} />
          )}
          {mode === "login" ? "دخول" : "إنشاء حساب"}
        </button>
      </form>

      <button
        className={styles.switchMode}
        onClick={() => {
          setMode(mode === "login" ? "signup" : "login");
          setError(null);
          setInfoMessage(null);
        }}
      >
        {mode === "login" ? "ما عندك حساب؟ سجّل جديد" : "عندك حساب؟ سجّل دخول"}
      </button>
    </div>
  );
}
