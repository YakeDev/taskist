import { Task } from "./task.js";
import { TaskManager } from "./taskManager.js";
import { Project } from "./project.js";
import "./styles.css";

const taskManager = new TaskManager();

// Création de projets
const personalProject = new Project(1, "Personnel", "Description projet 01");
const workProject = new Project(2, "Travail", "Description projet 02");

taskManager.addProject(personalProject);
taskManager.addProject(workProject);

// Création de tâches
const task1 = new Task(
  1,
  "Faire les courses",
  "Acheter du lait, du pain et des œufs",
  "2024-08-30",
  "urgent"
);
const task2 = new Task(
  2,
  "Terminer le rapport",
  "Finaliser le rapport pour le projet A",
  "2024-09-01",
  "Normal"
);

//Task checked
task2.taskCheck();

// Ajout des tâches aux projets
personalProject.addTask(task1);
workProject.addTask(task2);

console.log("Projets :", taskManager.getAllProjects());
console.log("Tâches du projet Personnel :", personalProject.getTasks());
console.log("Tâches du projet Travail :", workProject.getTasks());
