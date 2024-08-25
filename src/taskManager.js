import { Task } from "./task.js";
import { Project } from "./project.js";

export class TaskManager {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  getAllProjects() {
    return this.projects;
  }
}
