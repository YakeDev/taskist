import { Task } from "./task.js";
import { TaskManager } from "./taskManager.js";
import { Project } from "./project.js";
import { popupForm, closeBtn, proPopupForm } from "./htmlElts.js";

import "./styles.css";

const taskManager = new TaskManager();

const addNewTaskBtn = document.getElementById("add-new-task-btnTop");
const addNewTaskBottom = document.getElementById("add-new-task-btnBottom");

// Créer des projets par défaut
const defaultProject = new Project("Default", "Projets par défaut");
const personalProject = new Project("Personal", "Projets personnels");
const workProject = new Project("Work", "Projets liés au travail");

taskManager.addProject(defaultProject);
taskManager.addProject(personalProject);
taskManager.addProject(workProject);

// Fonction pour ajouter les projets au select
function populateProjectSelect() {
  const projectSelect = document.getElementById("projectList");
  // Efface les options existantes
  projectSelect.innerHTML = "";

  taskManager.getAllProjects().forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });
}

//Fonction pour afficher la liste de tous les projets
function allProjectSelect() {
  const projectList = document.querySelector(".main-task-list");

  const pageHeaderTitle = document.getElementById("page-header-title");
  pageHeaderTitle.textContent = "All Projects";

  // Efface les options existantes
  projectList.innerHTML = "";

  taskManager.getAllProjects().forEach((project) => {
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    li.innerHTML = `<i class="bi bi-folder2"></i> ${project.name}`;
    ul.appendChild(li);
    projectList.appendChild(ul);
  });

  pageHeaderTitle.style.marginBottom = "15px";

  addNewTaskBtn.style.display = "none";
  addNewTaskBottom.style.display = "none";
}

const showProjectList = document.getElementById("show-all-project");

showProjectList.addEventListener("click", () => {
  allProjectSelect();
});

// Appeler cette fonction lors du chargement de la page
populateProjectSelect();

function populateProjectList() {
  const projectUl = document.getElementById("nav-projectList");
  // Efface les projets existants pour éviter les doublons
  projectUl.innerHTML = "";

  taskManager.getAllProjects().forEach((project) => {
    const li = document.createElement("li");
    li.innerHTML = `<i class="bi bi-folder2"></i> ${project.name}`;
    projectUl.appendChild(li);
  });
}

// Appeler cette fonction lors du chargement de la page
populateProjectList();

//Task pop up fonctionnalities
document.getElementById("nav-addTask").addEventListener("click", function () {
  popupForm.style.display = "flex";
});

document
  .getElementById("add-new-task-btnTop")
  .addEventListener("click", function () {
    popupForm.style.display = "flex";
  });
document
  .getElementById("add-new-task-btnBottom")
  .addEventListener("click", function () {
    popupForm.style.display = "flex";
  });

closeBtn.addEventListener("click", function () {
  popupForm.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("popupForm")) {
    popupForm.style.display = "none";
  }
});

//Project Popup
document
  .getElementById("ek-create-project")
  .addEventListener("click", function () {
    document.getElementById("pro-popupForm").style.display = "flex";
    console.log("clickez");
  });

document.querySelector(".pro-close-btn").addEventListener("click", function () {
  document.getElementById("pro-popupForm").style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == document.getElementById("pro-popupForm")) {
    document.getElementById("pro-popupForm").style.display = "none";
  }
});

//Gestion soumission Formulaire Projet
document
  .getElementById("pro-projectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const projectName = document.getElementById("pro-projectTitle").value;
    const projectDescript = document.getElementById(
      "pro-projectDescription"
    ).value;

    // Créer des projets par défaut
    const newProject = new Project(projectName, projectDescript);
    taskManager.addProject(newProject);

    // Sauvegarder les projets et tâches dans le localStorage
    taskManager.saveProjectsToLocalStorage();
    populateProjectList();

    document.getElementById("pro-popupForm").style.display = "none";

    // console.log("Ajouter avec succes !!!");
  });

// Gestion de l'événement de soumission du formulaire
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("taskTitle").value;
    const description = document.getElementById("taskDescription").value;
    const dueDate = new Date(
      document.getElementById("taskDueDate").value
    ).toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const priority = document.getElementById("taskPriority").value;
    const projectName = document.getElementById("projectList").value;

    // Trouvez le projet sélectionné par son nom
    const selectedProject = taskManager.getProjectByName(projectName);

    if (selectedProject) {
      // Créez une nouvelle tâche
      const newTask = new Task(
        title,
        description,
        dueDate,
        priority,
        projectName
      );

      // Ajoutez la tâche au projet sélectionné
      selectedProject.addTask(newTask);

      // Sauvegarder les projets et tâches dans le localStorage
      taskManager.saveProjectsToLocalStorage();

      console.log(`Tâche ajoutée au projet ${projectName}:`, newTask);
    } else {
      console.error("Projet non trouvé :", projectName);
    }
    //actualiser la page

    // Fermez le popup après la soumission
    document.getElementById("popupForm").style.display = "none";

    //Effacer le contenu du formulaire
    document.getElementById("taskForm").reset();

    location.reload();
  });

// Delete task - Sélectionner tous les boutons de suppression
const deleteButtons = document.querySelectorAll(".bi-x-circle");
deleteButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const taskItem = button.closest(".main-task-item");
    const taskName = taskItem.querySelector(".task-name").textContent;

    // Supprimer la tâche du localStorage et du DOM
    taskManager.removeTaskFromLocalStorage(taskName);
    taskItem.remove();
  });
});

// Sauvegarder les projets et tâches dans le localStorage après ajout des tâches
taskManager.saveProjectsToLocalStorage();
populateProjectList();

// Ajouter un gestionnaire d'événements "click" à chaque checkbox

function toggleStrikethrough(taskItem, isChecked) {
  const elements = [
    taskItem.querySelector(".task-name"),
    taskItem.querySelector(".task-description"),
    taskItem.querySelector(".task-due-date"),
    taskItem.querySelector("input[type='checkbox']"),
  ];

  elements.forEach((element) => {
    if (element) {
      element.classList.toggle("strikethrough", isChecked);
      // element.querySelector('input[type="checkbox"]').taskCheck();
    }
  });
}

// Fonction pour gérer le clic sur une checkbox
function handleCheckboxClick(event) {
  const checkbox = event.target;
  const taskItem = checkbox.closest(".main-task-item");

  if (taskItem) {
    toggleStrikethrough(taskItem, checkbox.checked); // "checked" au lieu de "isChecked"
  }
}

// Sélectionner toutes les checkboxes et ajouter les gestionnaires d'événements
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("click", handleCheckboxClick);
});

//Afficher les taches par projet
const getProjectNames = document.querySelectorAll("#nav-projectList li");

getProjectNames.forEach((proName) => {
  proName.addEventListener("click", () => {
    const projectName = proName.textContent.trim();

    if (taskManager) {
      const selectedProject = taskManager.getProjectByName(projectName);

      const mainTaskList = document.querySelector(".main-task-list");
      mainTaskList.innerHTML = "";

      const pageHeaderTitle = document.getElementById("page-header-title");
      pageHeaderTitle.textContent = `${selectedProject.name} projects`;

      const projectData = selectedProject.getTasks();

      if (projectData.length === 0) {
        const noTaskMessage = document.createElement("p");
        noTaskMessage.textContent = "There are no tasks in this project.";
        noTaskMessage.style.fontSize = "1.4em";
        noTaskMessage.className = "no-task-message";
        mainTaskList.appendChild(noTaskMessage);
      } else {
        projectData.forEach((taskData) => {
          const task = new Task(
            taskData.title,
            taskData.description,
            taskData.dueDate,
            taskData.priority,
            taskData.project,
            taskData.checkList
          );

          selectedProject.showTask(task);
        });
      }

      // console.log("Nom du projet cliqué : ", projectName);
      // console.log("Projet sélectionné : ", selectedProject);
    }

    addNewTaskBtn.style.display = "flex";
    addNewTaskBottom.style.display = "flex";
  });
});

// Récupérer le bouton pour afficher toutes les tâches
const showAllTasksButton = document.getElementById("show-all-tasks-btn");

// Ajoutez un gestionnaire d'événements pour afficher toutes les tâches
showAllTasksButton.addEventListener("click", () => {
  // console.log("All Tasks");
  // Vider la liste des tâches actuelles
  const mainTaskList = document.querySelector(".main-task-list");
  mainTaskList.innerHTML = "";

  // Changer le titre de la page pour indiquer que toutes les tâches sont affichées
  const pageHeaderTitle = document.getElementById("page-header-title");
  pageHeaderTitle.textContent = "All Tasks";

  // Récupérer tous les projets du taskManager
  const allProjects = taskManager.getAllProjects();
  let allTasks = [];

  // Parcourir chaque projet et ajouter ses tâches à la liste
  allProjects.forEach((project) => {
    const projectTasks = project.getTasks();
    allTasks = [...allTasks, ...projectTasks];
  });

  // Si aucune tâche n'est trouvée, afficher un message
  if (allTasks.length === 0) {
    const noTaskMessage = document.createElement("p");
    noTaskMessage.textContent = "Il n'y a pas de tâches dans les projets.";
    noTaskMessage.style.fontSize = "1.4em";
    noTaskMessage.className = "no-task-message";
    mainTaskList.appendChild(noTaskMessage);
  } else {
    // Afficher chaque tâche
    allTasks.forEach((taskData) => {
      const task = new Task(
        taskData.title,
        taskData.description,
        taskData.dueDate,
        taskData.priority,
        taskData.project,
        taskData.checkList
      );

      // Ajouter chaque tâche à l'interface en utilisant showTask
      const project = taskManager.getProjectByName(task.project);
      project.showTask(task);
    });
  }

  addNewTaskBtn.style.display = "flex";
  addNewTaskBottom.style.display = "flex";
});

// // Afficher les projets et tâches dans la console
// console.log("Projets :", taskManager.getAllProjects());
// console.log("Tâches du projet Personnel :", personalProject.getTasks());
// console.log("Tâches du projet Travail :", workProject.getTasks());

// window.addEventListener("load", () => {
//   // Effacer tout le contenu du localStorage
//   localStorage.clear();
// });
