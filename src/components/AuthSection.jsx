import AuthForm from "../features/auth/AuthForm";
import styles from "./AuthSection.module.css";

export default function AuthSection() {
  return (
    <section id="auth" className={styles.section}>
      <AuthForm />
    </section>
  );
}
