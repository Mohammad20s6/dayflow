import { useState } from "react";
import {
  Mail,
  Lock,
  LogIn,
  UserPlus,
  Loader2,
  Eye,
  EyeOff,
  ArrowLeft,
  Sparkles,
} from "lucide-react";

import { supabase } from "../../services/supabase";

import styles from "./AuthForm.module.css";

export default function AuthForm() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const isLogin = mode === "login";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setInfoMessage(null);

    const cleanEmail = email.trim();

    if (!cleanEmail || !password) {
      setError("يرجى تعبئة جميع الحقول المطلوبة.");
      return;
    }

    setLoading(true);

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        })
      : await supabase.auth.signUp({
          email: cleanEmail,
          password,
        });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    if (!isLogin) {
      setInfoMessage(
        "تم إنشاء الحساب بنجاح. تحقق من بريدك الإلكتروني إذا كان تفعيل الحساب مطلوبًا.",
      );

      setPassword("");
    }

    // في حالة تسجيل الدخول الناجح:
    // onAuthStateChange في App.jsx سيتولى تحديث الـ session تلقائيًا.
  };

  const handleModeSwitch = () => {
    setMode(isLogin ? "signup" : "login");
    setError(null);
    setInfoMessage(null);
    setPassword("");
    setShowPassword(false);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {/* Decorative background */}
        <div className={styles.glow} aria-hidden="true" />

        {/* Brand */}
        {/* <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <Sparkles size={18} strokeWidth={2.2} />
          </div>

          <span>DayFlow</span>
        </div> */}

        {/* Heading */}
        <div className={styles.heading}>
          {/* <div className={styles.headingIcon}>
            {isLogin ? (
              <LogIn size={21} strokeWidth={2} />
            ) : (
              <UserPlus size={21} strokeWidth={2} />
            )}
          </div> */}

          <h1 className={styles.title}>
            {isLogin ? "مرحبًا بعودتك" : "ابدأ رحلتك"}
          </h1>

          <p className={styles.subtitle}>
            {isLogin
              ? "سجّل دخولك وتابع تنظيم يومك بسهولة."
              : "أنشئ حسابك وابدأ بتنظيم مهامك ووقتك."}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Email */}
          <div className={styles.field}>
            <label htmlFor="auth-email" className={styles.label}>
              البريد الإلكتروني
            </label>

            <div className={styles.inputGroup}>
              <Mail size={18} className={styles.inputIcon} aria-hidden="true" />

              <input
                id="auth-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.field}>
            <div className={styles.labelRow}>
              <label htmlFor="auth-password" className={styles.label}>
                كلمة المرور
              </label>

              {!isLogin && (
                <span className={styles.passwordHint}>6 أحرف على الأقل</span>
              )}
            </div>

            <div className={styles.inputGroup}>
              <Lock size={18} className={styles.inputIcon} aria-hidden="true" />

              <input
                id="auth-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete={isLogin ? "current-password" : "new-password"}
                minLength={6}
                required
                disabled={loading}
              />

              <button
                type="button"
                className={styles.passwordToggle}
                onClick={() => setShowPassword((visible) => !visible)}
                disabled={loading}
                aria-label={
                  showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"
                }
                title={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Messages */}
          {error && (
            <div className={styles.messageError} role="alert">
              <span className={styles.messageIcon}>!</span>
              <p>{error}</p>
            </div>
          )}

          {infoMessage && (
            <div className={styles.messageInfo} role="status">
              <span className={styles.messageIcon}>✓</span>
              <p>{infoMessage}</p>
            </div>
          )}

          {/* Submit */}
          <button type="submit" className={styles.submitBtn} disabled={loading}>
            <span className={styles.submitContent}>
              {loading ? (
                <>
                  <Loader2 size={18} className={styles.spinner} />
                  <span>
                    {isLogin ? "جاري تسجيل الدخول..." : "جاري إنشاء الحساب..."}
                  </span>
                </>
              ) : (
                <>
                  {/* {isLogin ? <LogIn size={18} /> : <UserPlus size={18} />} */}

                  <span>{isLogin ? "تسجيل الدخول" : "إنشاء الحساب"}</span>

                  <ArrowLeft size={17} className={styles.submitArrow} />
                </>
              )}
            </span>
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span />
          <small>أو</small>
          <span />
        </div>

        {/* Mode switch */}
        <div className={styles.switchSection}>
          <span>{isLogin ? "ليس لديك حساب بعد؟" : "لديك حساب بالفعل؟"}</span>

          <button
            type="button"
            className={styles.switchMode}
            onClick={handleModeSwitch}
            disabled={loading}
          >
            {isLogin ? "إنشاء حساب جديد" : "تسجيل الدخول"}
          </button>
        </div>

        {/* Footer */}
        <p className={styles.footerText}>
          نظّم يومك، ركّز على ما يهمك، واترك الباقي لـ DayFlow.
        </p>
      </div>
    </div>
  );
}
