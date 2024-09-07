export class Task {
  constructor(
    title,
    description,
    dueDate,
    priority,
    project,
    checkList = false
  ) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.project = project;
    this.checkList = checkList; // Par défaut non complété
  }

  taskCheck() {
    this.checkList = !this.checkList;
  }
}
