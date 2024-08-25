export class Project {
  constructor(id, projectName, description) {
    this.id = id;
    this.projectName = projectName;
    this.description = description;
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  getTasks() {
    return this.tasks;
  }
}
