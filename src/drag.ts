const draggables = document.querySelectorAll<HTMLDivElement>(".task");
const droppables = document.querySelectorAll<HTMLDivElement>(".swim-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e: DragEvent) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    console.log("🚀 ~ file: drag.ts:18 ~ bottomTask:", bottomTask);
    const curTask = document.querySelector<HTMLDivElement>(".is-dragging");

    if (!curTask) return;

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (
  zone: HTMLDivElement,
  mouseY: number
): HTMLDivElement | null => {
  const els = zone.querySelectorAll<HTMLDivElement>(".task:not(.is-dragging)");

  let closestTask: HTMLDivElement | null = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};
