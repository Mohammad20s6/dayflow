import { useState } from "react";
import { Plus, Trash2, Check, X } from "lucide-react";
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

  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditingName(cat.name);
  };

  const saveEdit = (id) => {
    if (editingName.trim())
      updateCategory.mutate({ id, updates: { name: editingName.trim() } });
    setEditingId(null);
  };

  return (
    <div className={styles.wrap}>
      <h2 className={styles.heading}>التصنيفات</h2>

      <form onSubmit={handleCreate} className={styles.createRow}>
        <div className={styles.swatches}>
          {PALETTE.map((c) => (
            <button
              type="button"
              key={c}
              className={styles.swatch}
              style={{
                background: c,
                outline: c === color ? "2px solid var(--ink)" : "none",
              }}
              onClick={() => setColor(c)}
              aria-label={`اختر اللون ${c}`}
            />
          ))}
        </div>
        <input
          placeholder="اسم تصنيف جديد"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className={styles.addBtn}>
          <Plus size={16} /> إضافة
        </button>
      </form>

      {isLoading ? (
        <p className={styles.state}>جاري التحميل...</p>
      ) : !categories?.length ? (
        <p className={styles.state}>
          ما عندك تصنيفات بعد — ضيف أول وحدة من فوق.
        </p>
      ) : (
        <div className={styles.list}>
          {categories.map((cat) => (
            <div key={cat.id} className={styles.row}>
              <span className={styles.dot} style={{ background: cat.color }} />
              {editingId === cat.id ? (
                <>
                  <input
                    autoFocus
                    className={styles.editInput}
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && saveEdit(cat.id)}
                  />
                  <button onClick={() => saveEdit(cat.id)} aria-label="حفظ">
                    <Check size={16} />
                  </button>
                  <button onClick={() => setEditingId(null)} aria-label="إلغاء">
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <span className={styles.name} onClick={() => startEdit(cat)}>
                    {cat.name}
                  </span>
                  <button
                    onClick={() => deleteCategory.mutate(cat.id)}
                    aria-label="حذف"
                    className={styles.deleteBtn}
                  >
                    <Trash2 size={15} />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
