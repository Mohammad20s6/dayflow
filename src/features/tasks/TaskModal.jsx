import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, CalendarDays, Clock3 } from "lucide-react";

import { closeTaskModal } from "../ui/uiSlice";
import { useCreateTask, useUpdateTask, useTasks } from "./tasksQueries";
// import { useCategories } from "../categories/categoriesQueries";

import {
  useCategories,
  useCreateCategory,
} from "../categories/categoriesQueries";

import styles from "./TaskModal.module.css";

function toLocalInput(date) {
  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "";
  }

  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(
    d.getDate(),
  )}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TaskModal({ userId }) {
  const dispatch = useDispatch();

  const { addTaskOpen, editingTaskId } = useSelector((state) => state.ui.modal);

  const filters = useSelector((state) => state.ui.filters);

  const { data: tasks } = useTasks(userId, filters);
  const { data: categories } = useCategories(userId);

  const editingTask = tasks?.find((task) => task.id === editingTaskId);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);

  const createTask = useCreateTask(userId);
  const updateTask = useUpdateTask(userId);

  // new
  const createCategory = useCreateCategory(userId);
  const [addingCategory, setAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    const created = await createCategory.mutateAsync({
      name: newCategoryName.trim(),
      color: "#8b5cf6",
    });
    setCategoryId(created.id);
    setNewCategoryName("");
    setAddingCategory(false);
  };

  /*
   * تجهيز البيانات عند:
   * - فتح Modal الإضافة
   * - فتح Modal التعديل
   * - الانتقال من إضافة إلى تعديل أو العكس
   */
  useEffect(() => {
    if (!addTaskOpen) {
      return;
    }

    if (editingTask) {
      setTitle(editingTask.title || "");
      setCategoryId(editingTask.category_id || "");
      setStartTime(toLocalInput(editingTask.start_time));
      setEndTime(toLocalInput(editingTask.end_time));
    } else {
      setTitle("");
      setCategoryId("");
      setStartTime("");
      setEndTime("");
    }

    setError(null);
  }, [editingTask, editingTaskId, addTaskOpen]);

  /*
   * إغلاق الـ Modal عند الضغط على Escape
   */
  useEffect(() => {
    if (!addTaskOpen) {
      return;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        dispatch(closeTaskModal());
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [addTaskOpen, dispatch]);

  if (!addTaskOpen) {
    return null;
  }

  const isSaving = createTask.isPending || updateTask.isPending;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSaving) {
      return;
    }

    setError(null);

    /*
     * 1. التحقق من العنوان
     */
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("اكتب عنوان المهمة أولًا");
      return;
    }

    /*
     * 2. التحقق من الوقت
     */
    if (!startTime || !endTime) {
      setError("حدد وقت البداية والنهاية");
      return;
    }

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
      setError("التاريخ أو الوقت غير صالح");
      return;
    }

    /*
     * 3. النهاية يجب أن تكون بعد البداية
     */
    if (end <= start) {
      setError("وقت النهاية لازم يكون بعد وقت البداية");
      return;
    }

    /*
     * البيانات التي سترسل إلى Supabase
     */
    const payload = {
      title: trimmedTitle,
      category_id: categoryId || null,
      start_time: start.toISOString(),
      end_time: end.toISOString(),
    };

    try {
      if (editingTask) {
        await updateTask.mutateAsync({
          id: editingTask.id,
          updates: payload,
        });
      } else {
        await createTask.mutateAsync(payload);
      }

      /*
       * إذا نجحت العملية:
       * أغلق الـ Modal
       */
      dispatch(closeTaskModal());
    } catch (err) {
      setError(err?.message || "صار خطأ أثناء حفظ المهمة");
    }
  };

  const handleOverlayClick = () => {
    if (!isSaving) {
      dispatch(closeTaskModal());
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      dispatch(closeTaskModal());
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.heading}>
            <div className={styles.headingIcon}>
              <CalendarDays size={18} />
            </div>

            <div>
              <h3 id="task-modal-title">
                {editingTask ? "تعديل المهمة" : "مهمة جديدة"}
              </h3>

              <p>
                {editingTask
                  ? "حدّث تفاصيل المهمة كما تريد"
                  : "خطط لشيء مهم في يومك"}
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={handleClose}
            disabled={isSaving}
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          {/* Title */}
          <label className={styles.field}>
            <span className={styles.label}>عنوان المهمة</span>

            <input
              className={styles.input}
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="مثال: دراسة React Query"
              autoFocus
              required
              disabled={isSaving}
            />
          </label>

          {/* Category */}
          <label className={styles.field}>
            <span className={styles.label}>التصنيف</span>
            {!addingCategory ? (
              <select
                className={styles.input}
                value={categoryId}
                onChange={(e) => {
                  if (e.target.value === "__new__") setAddingCategory(true);
                  else setCategoryId(e.target.value);
                }}
                disabled={isSaving}
              >
                <option value="">بدون تصنيف</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="__new__">+ إضافة تصنيف جديد</option>
              </select>
            ) : (
              <div style={{ display: "flex", gap: 8 }}>
                <input
                  autoFocus
                  placeholder="اسم التصنيف"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    (e.preventDefault(), handleAddCategory())
                  }
                />
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className={styles.submitBtn}
                  style={{ width: 70 }}
                >
                  إضافة
                </button>
              </div>
            )}
          </label>

          {/* Time section */}
          <div className={styles.sectionTitle}>
            <Clock3 size={15} />
            <span>موعد المهمة</span>
          </div>

          <div className={styles.timeGrid}>
            {/* Start */}
            <label className={styles.field}>
              <span className={styles.label}>من</span>

              <div className={styles.dateInputWrapper}>
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  dir="ltr"
                  required
                  disabled={isSaving}
                />
              </div>
            </label>

            {/* End */}
            <label className={styles.field}>
              <span className={styles.label}>إلى</span>

              <div className={styles.dateInputWrapper}>
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  dir="ltr"
                  required
                  disabled={isSaving}
                />
              </div>
            </label>
          </div>

          {/* Error */}
          {error && (
            <div className={styles.error} role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          {/* Footer */}
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={handleClose}
              disabled={isSaving}
            >
              إلغاء
            </button>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSaving}
            >
              {isSaving
                ? "جاري الحفظ..."
                : editingTask
                  ? "حفظ التعديل"
                  : "إضافة المهمة"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
