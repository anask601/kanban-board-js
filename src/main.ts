import "./style.css";

const form = document.getElementById("todo-form") as HTMLFormElement;
const input = document.getElementById("todo-input") as HTMLInputElement;
const todoLane = document.getElementById("todo-lane") as HTMLDivElement;

form.addEventListener("submit", (e: Event) => {
  e.preventDefault();
  const value: string = input.value;

  if (!value) return;

  const newTask: HTMLParagraphElement = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});
