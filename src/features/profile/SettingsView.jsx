import { useEffect, useRef, useState } from "react";

import { Check, ImagePlus, Loader2, Mail, Save, User, X } from "lucide-react";

import {
  useProfile,
  useUpdateProfile,
  useUploadAvatar,
} from "./profileQueries";

import styles from "./SettingsView.module.css";

export default function SettingsView({ userId, userEmail }) {
  const fileInputRef = useRef(null);

  const { data: profile, isLoading, isError, error } = useProfile(userId);

  const updateProfile = useUpdateProfile(userId);
  const uploadAvatar = useUploadAvatar(userId);

  const [displayName, setDisplayName] = useState("");
  const [saved, setSaved] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name || "");
    }
  }, [profile]);

  const handleSave = async (event) => {
    event.preventDefault();

    setLocalError(null);
    setSaved(false);

    const cleanName = displayName.trim();

    if (!cleanName) {
      setLocalError("اكتب الاسم المعروض أولاً");
      return;
    }

    if (cleanName.length > 50) {
      setLocalError("الاسم يجب ألا يتجاوز 50 حرفاً");
      return;
    }

    try {
      await updateProfile.mutateAsync({
        display_name: cleanName,
      });

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      setLocalError(err?.message || "تعذر حفظ التغييرات، حاول مرة أخرى.");
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];

    // يسمح باختيار نفس الصورة مرة أخرى لاحقاً.
    event.target.value = "";

    if (!file) return;

    setLocalError(null);

    try {
      await uploadAvatar.mutateAsync(file);
    } catch (err) {
      setLocalError(err?.message || "تعذر رفع الصورة، حاول مرة أخرى.");
    }
  };

  const handleRemoveError = () => {
    setLocalError(null);
  };

  if (isLoading) {
    return (
      <section className={styles.page}>
        <div className={styles.loadingCard}>
          <div className={styles.loadingIcon}>
            <Loader2 size={22} />
          </div>

          <div>
            <strong>جاري تحميل الإعدادات</strong>
            <p>لحظات ونجهز لك بيانات حسابك...</p>
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className={styles.page}>
        <div className={styles.errorCard} role="alert">
          <div className={styles.errorIcon}>!</div>

          <div>
            <strong>تعذر تحميل الإعدادات</strong>
            <p>{error?.message || "حدث خطأ أثناء تحميل بيانات حسابك."}</p>
          </div>
        </div>
      </section>
    );
  }

  const avatarUrl = profile?.avatar_url;
  const initial =
    profile?.display_name?.trim()?.[0]?.toUpperCase() ||
    userEmail?.trim()?.[0]?.toUpperCase() ||
    "U";

  const isUploading = uploadAvatar.isPending;
  const isSaving = updateProfile.isPending;

  return (
    <section className={styles.page} dir="rtl">
      <div className={styles.header}>
        <div>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            حسابك الشخصي
          </div>

          <h1 className={styles.heading}>الإعدادات</h1>

          <p className={styles.description}>
            عدّل معلوماتك الشخصية والصورة التي تظهر في حسابك.
          </p>
        </div>
      </div>

      {localError && (
        <div className={styles.alert} role="alert">
          <div className={styles.alertIcon}>!</div>

          <p>{localError}</p>

          <button
            type="button"
            className={styles.alertClose}
            onClick={handleRemoveError}
            aria-label="إغلاق رسالة الخطأ"
          >
            <X size={16} />
          </button>
        </div>
      )}

      <div className={styles.content}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <User size={18} />
            </div>

            <div>
              <h2>المعلومات الشخصية</h2>
              <p>هذه المعلومات ستظهر ضمن حسابك في DayFlow.</p>
            </div>
          </div>

          <div className={styles.avatarSection}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>
                {avatarUrl ? (
                  <img src={avatarUrl} alt="الصورة الشخصية" />
                ) : (
                  <span>{initial}</span>
                )}

                {isUploading && (
                  <div className={styles.avatarOverlay}>
                    <Loader2 size={22} className={styles.spinner} />
                  </div>
                )}
              </div>

              <div className={styles.avatarStatus} />
            </div>

            <div className={styles.avatarInfo}>
              <h3>الصورة الشخصية</h3>

              <p>
                اختر صورة واضحة لك لتظهر في حسابك.
                <br />
                الحد الأقصى لحجم الصورة 5MB.
              </p>

              <button
                type="button"
                className={styles.uploadBtn}
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 size={16} className={styles.spinner} />
                    جاري رفع الصورة...
                  </>
                ) : (
                  <>
                    <ImagePlus size={16} />
                    تغيير الصورة
                  </>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleAvatarChange}
              />
            </div>
          </div>

          <div className={styles.divider} />

          <form onSubmit={handleSave} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="user-email">البريد الإلكتروني</label>

              <div className={styles.inputWrapper}>
                <Mail size={17} className={styles.inputIcon} />

                <input
                  id="user-email"
                  type="email"
                  value={userEmail || ""}
                  disabled
                  dir="ltr"
                />

                <span className={styles.readOnlyBadge}>ثابت</span>
              </div>

              <small>
                البريد الإلكتروني مرتبط بحساب تسجيل الدخول ولا يمكن تغييره من
                هنا.
              </small>
            </div>

            <div className={styles.field}>
              <label htmlFor="display-name">الاسم المعروض</label>

              <div className={styles.inputWrapper}>
                <User size={17} className={styles.inputIcon} />

                <input
                  id="display-name"
                  type="text"
                  value={displayName}
                  onChange={(event) => {
                    setDisplayName(event.target.value);
                    setSaved(false);
                    setLocalError(null);
                  }}
                  placeholder="مثال: Mohammad"
                  maxLength={50}
                  autoComplete="name"
                />

                <span className={styles.counter}>{displayName.length}/50</span>
              </div>

              <small>هذا الاسم سيظهر لك داخل واجهة التطبيق.</small>
            </div>

            <div className={styles.formFooter}>
              <p className={styles.saveHint}>
                {saved ? (
                  <>
                    <Check size={15} />
                    تم حفظ التغييرات بنجاح
                  </>
                ) : (
                  "تأكد من معلوماتك قبل الحفظ."
                )}
              </p>

              <button
                type="submit"
                className={`${styles.saveBtn} ${
                  saved ? styles.saveBtnSuccess : ""
                }`}
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={17} className={styles.spinner} />
                    جاري الحفظ...
                  </>
                ) : saved ? (
                  <>
                    <Check size={17} />
                    تم الحفظ
                  </>
                ) : (
                  <>
                    <Save size={17} />
                    حفظ التغييرات
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        <aside className={styles.tipCard}>
          <div className={styles.tipIcon}>✦</div>

          <div>
            <h3>ملفك الشخصي</h3>
            <p>
              حافظ على معلوماتك محدثة حتى تظهر تجربتك داخل DayFlow بشكل مرتب
              وشخصي.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
