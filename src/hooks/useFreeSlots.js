import { useMemo } from "react";

const DAY_START_HOUR = 7;
const DAY_END_HOUR = 23;
const MIN_GAP_MINUTES = 20; // فجوات أصغر من هيك ما بتستاهل تنعرض كـ "وقت فاضي"

export function useFreeSlots(tasks = [], referenceDate = new Date()) {
  return useMemo(() => {
    const dayStart = new Date(referenceDate);
    dayStart.setHours(DAY_START_HOUR, 0, 0, 0);
    const dayEnd = new Date(referenceDate);
    dayEnd.setHours(DAY_END_HOUR, 0, 0, 0);

    const sorted = [...tasks]
      .map((t) => ({
        start: new Date(t.start_time),
        end: new Date(t.end_time),
      }))
      .filter((t) => t.end > dayStart && t.start < dayEnd)
      .sort((a, b) => a.start - b.start);

    const freeSlots = [];
    let cursor = dayStart;

    for (const task of sorted) {
      const taskStart = task.start < dayStart ? dayStart : task.start;
      if (taskStart - cursor >= MIN_GAP_MINUTES * 60 * 1000) {
        freeSlots.push({ start: new Date(cursor), end: new Date(taskStart) });
      }
      if (task.end > cursor) cursor = task.end > dayEnd ? dayEnd : task.end;
    }

    if (dayEnd - cursor >= MIN_GAP_MINUTES * 60 * 1000) {
      freeSlots.push({ start: new Date(cursor), end: new Date(dayEnd) });
    }

    const totalFreeMinutes = freeSlots.reduce(
      (sum, s) => sum + (s.end - s.start) / 60000,
      0,
    );

    return { freeSlots, totalFreeMinutes };
  }, [tasks, referenceDate]);
}
