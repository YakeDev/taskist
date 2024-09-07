// scripts.js
const popupForm = document.getElementById("popupForm");
const proPopupForm = document.getElementById("ek-create-project");

const closeBtn = document.querySelector(".close-btn");

const title = document.getElementById("taskTitle");
const description = document.getElementById("taskDescription");
const dueDate = document.getElementById("taskDueDate");
const priority = document.getElementById("taskPriority");
const checkList = document.getElementById("taskCheckList");
const taskForm = document.getElementById("taskForm");
const projectLbl = document.getElementById("project-label");

const popupProject = document.getElementById("popup-project");
const openPopupProjectBtn = document.getElementById("openPopup-project");
const closePopupProjectBtn = document.getElementById("closePopup-project");
const projectForm = document.getElementById("projectForm");

export {
  proPopupForm,
  popupProject,
  projectForm,
  projectLbl,
  popupForm,
  closeBtn,
  taskForm,
  title,
  description,
  dueDate,
  priority,
  checkList,
};
