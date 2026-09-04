import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { X, CalendarDays, Clock3 } from "lucide-react";

import { closeTaskModal } from "../ui/uiSlice";
import { useCreateTask, useUpdateTask, useTasks } from "./tasksQueries";
import { useCategories } from "../categories/categoriesQueries";

import styles from "./TaskModal.module.css";

function toLocalInput(date) {
  const d = new Date(date);

  const pad = (n) => String(n).padStart(2, "0");

  return `${d.getFullYear()}-${pad(
    d.getMonth() + 1,
  )}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function TaskModal({ userId }) {
  const dispatch = useDispatch();

  const { addTaskOpen, editingTaskId } = useSelector((s) => s.ui.modal);

  const filters = useSelector((s) => s.ui.filters);

  const { data: tasks } = useTasks(userId, filters);
  const { data: categories } = useCategories(userId);

  const editingTask = tasks?.find((task) => task.id === editingTaskId);

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
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
  }, [editingTaskId, addTaskOpen]);

  const createTask = useCreateTask(userId);
  const updateTask = useUpdateTask(userId);

  if (!addTaskOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError("اكتب عنوان المهمة أولًا");
      return;
    }

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

    if (end <= start) {
      setError("وقت النهاية لازم يكون بعد وقت البداية");
      return;
    }

    const payload = {
      title: title.trim(),
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

      dispatch(closeTaskModal());
    } catch (err) {
      setError(err.message || "صار خطأ أثناء حفظ المهمة");
    }
  };

  const isSaving = createTask.isPending || updateTask.isPending;

  return (
    <div
      className={styles.overlay}
      onClick={() => dispatch(closeTaskModal())}
      role="presentation"
    >
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
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
            onClick={() => dispatch(closeTaskModal())}
            aria-label="إغلاق"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} noValidate>
          <label className={styles.field}>
            <span className={styles.label}>عنوان المهمة</span>

            <input
              className={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: دراسة React Query"
              autoFocus
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>التصنيف</span>

            <select
              className={styles.input}
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">بدون تصنيف</option>

              {categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.sectionTitle}>
            <Clock3 size={15} />
            <span>موعد المهمة</span>
          </div>

          <div className={styles.timeGrid}>
            <label className={styles.field}>
              <span className={styles.label}>من</span>

              <div className={styles.dateInputWrapper}>
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  dir="ltr"
                  required
                />
              </div>
            </label>

            <label className={styles.field}>
              <span className={styles.label}>إلى</span>

              <div className={styles.dateInputWrapper}>
                <input
                  className={styles.input}
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  dir="ltr"
                  required
                />
              </div>
            </label>
          </div>

          {error && (
            <div className={styles.error} role="alert">
              <span>!</span>
              <p>{error}</p>
            </div>
          )}

          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => dispatch(closeTaskModal())}
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
