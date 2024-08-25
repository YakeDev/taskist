// greeting.js
export class Task {
  constructor(id, title, description, dueDate, priority, checkList = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checkList = checkList;
  }

  taskCheck() {
    this.checkList = !this.checkList;
  }
}
