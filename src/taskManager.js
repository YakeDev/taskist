import { Task } from "./task.js";
import { Project } from "./project.js";

export class TaskManager {
  constructor() {
    this.projects = this.loadProjectsFromLocalStorage() || [];
  }

  addProject(project) {
    // Vérifiez si le projet existe déjà par son nom
    if (this.getProjectByName(project.name)) {
      // console.warn(`Le projet "${project.name}" existe déjà.`);
      return;
    }
    this.projects.push(project);
    this.saveProjectsToLocalStorage();
  }

  getProjectById(id) {
    return this.projects.find((project) => project.id === id);
  }

  getProjectByName(name) {
    return this.projects.find((project) => project.name === name);
  }

  getAllProjects() {
    return this.projects;
  }

  // Sauvegarde les projets dans le localStorage
  saveProjectsToLocalStorage() {
    const projectsData = this.projects.map((project) => ({
      name: project.name,
      description: project.description,
      tasks: project.getTasks().map((task) => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        project: task.project,
        checkList: task.checkList, // Sauvegarder l'état de la tâche
      })),
    }));
    localStorage.setItem("taskManagerProjects", JSON.stringify(projectsData));
  }

  // Charge les projets depuis le localStorage
  loadProjectsFromLocalStorage() {
    const projectsData = JSON.parse(
      localStorage.getItem("taskManagerProjects")
    );
    if (projectsData) {
      return projectsData.map((projectData) => {
        const project = new Project(projectData.name, projectData.description);
        projectData.tasks.forEach((taskData) => {
          const task = new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.project,
            taskData.checkList // Charger l'état de la tâche
          );
          project.addTask(task);
        });
        return project;
      });
    }
    return [];
  }

  removeTaskFromLocalStorage(taskName) {
    // Parcourir tous les projets
    this.projects.forEach((project) => {
      // Filtrer les tâches du projet pour enlever celle qui correspond au nom donné
      project.tasks = project
        .getTasks()
        .filter((task) => task.title !== taskName);
    });

    // Sauvegarder les changements dans le localStorage
    this.saveProjectsToLocalStorage();
  }
}
