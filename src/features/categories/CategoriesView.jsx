import { useState } from "react";
import { Check, FolderKanban, Plus, Trash2, X } from "lucide-react";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "./categoriesQueries";
import styles from "./CategoriesView.module.css";
const PALETTE = [
  "#8b5cf6",
  "#f59e0b",
  "#0ea5e9",
  "#22c55e",
  "#ef4444",
  "#ec4899",
];
export default function CategoriesView({ userId }) {
  const { data: categories, isLoading } = useCategories(userId);
  const createCategory = useCreateCategory(userId);
  const updateCategory = useUpdateCategory(userId);
  const deleteCategory = useDeleteCategory(userId);
  const [name, setName] = useState("");
  const [color, setColor] = useState(PALETTE[0]);
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");
  const handleCreate = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    createCategory.mutate({ name: name.trim(), color });
    setName("");
  };
  const startEdit = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };
  const saveEdit = (id) => {
    if (!editingName.trim()) return;
    updateCategory.mutate({ id, updates: { name: editingName.trim() } });
    setEditingId(null);
    setEditingName("");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };
  return (
    <div className={styles.wrap}>
      {" "}
      <div className={styles.heading}>
        {" "}
        <div className={styles.headingIcon}>
          {" "}
          <FolderKanban size={20} />{" "}
        </div>{" "}
        <div>
          {" "}
          <span className={styles.eyebrow}> تنظيم يومك </span>{" "}
          <h1>التصنيفات</h1>{" "}
          <p> رتّب مهامك ضمن مجموعات واضحة وسهلة التمييز. </p>{" "}
        </div>{" "}
      </div>{" "}
      <form onSubmit={handleCreate} className={styles.createCard}>
        {" "}
        <div className={styles.createHeader}>
          {" "}
          <div>
            {" "}
            <strong>تصنيف جديد</strong>{" "}
            <span>اختر اسمًا ولونًا مناسبًا</span>{" "}
          </div>{" "}
          <div
            className={styles.previewDot}
            style={{ background: color }}
          />{" "}
        </div>{" "}
        <div className={styles.createControls}>
          {" "}
          <div className={styles.colorPicker}>
            {" "}
            {PALETTE.map((paletteColor) => (
              <button
                type="button"
                key={paletteColor}
                className={`${styles.swatch} ${paletteColor === color ? styles.swatchActive : ""}`}
                style={{ background: paletteColor }}
                onClick={() => setColor(paletteColor)}
                aria-label={`اختر اللون ${paletteColor}`}
              />
            ))}{" "}
          </div>{" "}
          <input
            placeholder="مثلاً: دراسة، عمل، شخصي..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={40}
          />{" "}
          <button
            type="submit"
            className={styles.addBtn}
            disabled={createCategory.isPending}
          >
            {" "}
            <Plus size={16} />{" "}
            {createCategory.isPending ? "جاري الإضافة..." : "إضافة"}{" "}
          </button>{" "}
        </div>{" "}
      </form>{" "}
      {isLoading ? (
        <div className={styles.state}>
          {" "}
          <div className={styles.spinner} />{" "}
          <span>جاري تحميل التصنيفات...</span>{" "}
        </div>
      ) : !categories?.length ? (
        <div className={styles.empty}>
          {" "}
          <div className={styles.emptyIcon}>
            {" "}
            <FolderKanban size={20} />{" "}
          </div>{" "}
          <strong>لا توجد تصنيفات بعد</strong>{" "}
          <p> أنشئ أول تصنيف من النموذج بالأعلى لتنظيم مهامك. </p>{" "}
        </div>
      ) : (
        <div className={styles.list}>
          {" "}
          {categories.map((category) => (
            <div key={category.id} className={styles.row}>
              {" "}
              <span
                className={styles.dot}
                style={{
                  background: category.color,
                  boxShadow: `0 0 0 4px ${category.color}18`,
                }}
              />{" "}
              {editingId === category.id ? (
                <>
                  {" "}
                  <input
                    autoFocus
                    className={styles.editInput}
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        saveEdit(category.id);
                      }
                      if (e.key === "Escape") {
                        cancelEdit();
                      }
                    }}
                  />{" "}
                  <button
                    className={styles.actionBtn}
                    type="button"
                    onClick={() => saveEdit(category.id)}
                    aria-label="حفظ التعديل"
                  >
                    {" "}
                    <Check size={16} />{" "}
                  </button>{" "}
                  <button
                    className={styles.actionBtn}
                    type="button"
                    onClick={cancelEdit}
                    aria-label="إلغاء التعديل"
                  >
                    {" "}
                    <X size={16} />{" "}
                  </button>{" "}
                </>
              ) : (
                <>
                  {" "}
                  <button
                    type="button"
                    className={styles.name}
                    onClick={() => startEdit(category)}
                    title="اضغط للتعديل"
                  >
                    {" "}
                    {category.name}{" "}
                  </button>{" "}
                  <button
                    type="button"
                    onClick={() => deleteCategory.mutate(category.id)}
                    aria-label="حذف التصنيف"
                    className={styles.deleteBtn}
                    disabled={deleteCategory.isPending}
                  >
                    {" "}
                    <Trash2 size={15} />{" "}
                  </button>{" "}
                </>
              )}{" "}
            </div>
          ))}{" "}
        </div>
      )}{" "}
    </div>
  );
}
