import { supabase } from "./supabase";

export async function getTasks({
  userId,
  category = "all",
  status = "all",
  search = "",
}) {
  let query = supabase
    .from("tasks")
    .select("*, categories(id, name, color, icon)")
    .eq("user_id", userId)
    .order("start_time", { ascending: true });

  if (category !== "all") query = query.eq("category_id", category);
  if (status === "completed") query = query.eq("is_completed", true);
  else if (status === "pending") query = query.eq("is_completed", false);
  if (search.trim()) query = query.ilike("title", `%${search.trim()}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function createTask(task) {
  const { data, error } = await supabase
    .from("tasks")
    .insert(task)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateTask(id, updates) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteTask(id) {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
  return id;
}

export async function toggleTaskComplete(id, isCompleted) {
  return updateTask(id, { is_completed: isCompleted });
}
