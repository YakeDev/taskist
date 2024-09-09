export class Project {
  constructor(name, description) {
    // this.id = id;
    this.name = name;
    this.description = description;
    this.tasks = [];
  }

  addTask(task) {
    // Créez les éléments nécessaires
    const taskItem = document.createElement("div");
    taskItem.className = "main-task-item";

    const taskTop = document.createElement("div");
    taskTop.className = "task-top";

    const taskTopLeft = document.createElement("div");
    taskTopLeft.className = "task-top-left";

    const taskNameContainer = document.createElement("div");
    taskNameContainer.className = "task-name-container";

    const circularCheckbox = document.createElement("label");
    circularCheckbox.className = "circular-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    // const spanCheckbox = document.createElement("span");
    const spanTaskName = document.createElement("span");
    spanTaskName.className = "task-name";
    spanTaskName.textContent = task.title;

    const taskDueDate = document.createElement("p");
    taskDueDate.className = "task-due-date";
    taskDueDate.innerHTML = `<i class="bi bi-calendar2-event"></i> ${task.dueDate}`;

    const taskTopRight = document.createElement("div");
    taskTopRight.className = "task-top-right";

    const editIcon = document.createElement("i");
    editIcon.className = "bi bi-pencil-square";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-x-circle";

    const taskBottom = document.createElement("div");
    taskBottom.className = "task-bottom";

    const taskDescription = document.createElement("p");
    taskDescription.className = "task-description";
    taskDescription.textContent = task.description;

    const taskProject = document.createElement("p");
    taskProject.className = "task-project";

    const taskLabel = document.createElement("span");
    taskLabel.className = "task-label";
    taskLabel.innerHTML = `<i class="bi bi-folder2"></i> ${task.project}`;
    // console.log("===== task project" + task.project);

    const taskLabelPriority = document.createElement("span");
    taskLabelPriority.className = "task-label";
    taskLabelPriority.id = "task-priority";
    taskLabelPriority.innerHTML = `<i class="bi bi-flag"></i> ${task.priority}`;

    // Assembler les éléments
    circularCheckbox.appendChild(checkbox);
    // circularCheckbox.appendChild(spanCheckbox);
    circularCheckbox.appendChild(spanTaskName);

    taskNameContainer.appendChild(circularCheckbox);
    taskNameContainer.appendChild(taskDueDate);

    taskTopLeft.appendChild(taskNameContainer);

    taskTopRight.appendChild(editIcon);
    taskTopRight.appendChild(deleteIcon);

    taskTop.appendChild(taskTopLeft);
    taskTop.appendChild(taskTopRight);

    taskBottom.appendChild(taskDescription);
    taskBottom.appendChild(taskProject);
    taskProject.appendChild(taskLabel);
    taskProject.appendChild(taskLabelPriority);

    taskItem.appendChild(taskTop);
    taskItem.appendChild(taskBottom);

    // Ajouter la tâche à la liste principale
    document.querySelector(".main-task-list").appendChild(taskItem);

    this.tasks.push(task);
  }

  showTask(task) {
    // Créez les éléments nécessaires
    const taskItem = document.createElement("div");
    taskItem.className = "main-task-item";

    const taskTop = document.createElement("div");
    taskTop.className = "task-top";

    const taskTopLeft = document.createElement("div");
    taskTopLeft.className = "task-top-left";

    const taskNameContainer = document.createElement("div");
    taskNameContainer.className = "task-name-container";

    const circularCheckbox = document.createElement("label");
    circularCheckbox.className = "circular-checkbox";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.checkList;

    // const spanCheckbox = document.createElement("span");
    const spanTaskName = document.createElement("span");
    spanTaskName.className = "task-name";
    spanTaskName.textContent = task.title;

    const taskDueDate = document.createElement("p");
    taskDueDate.className = "task-due-date";
    taskDueDate.innerHTML = `<i class="bi bi-calendar2-event"></i> ${task.dueDate}`;

    const taskTopRight = document.createElement("div");
    taskTopRight.className = "task-top-right";

    const editIcon = document.createElement("i");
    editIcon.className = "bi bi-pencil-square";

    const deleteIcon = document.createElement("i");
    deleteIcon.className = "bi bi-x-circle";

    const taskBottom = document.createElement("div");
    taskBottom.className = "task-bottom";

    const taskDescription = document.createElement("p");
    taskDescription.className = "task-description";
    taskDescription.textContent = task.description;

    const taskProject = document.createElement("p");
    taskProject.className = "task-project";

    const taskLabel = document.createElement("span");
    taskLabel.className = "task-label";
    taskLabel.innerHTML = `<i class="bi bi-folder2"></i> ${task.project}`;
    // console.log("===== task project" + task.project);

    const taskLabelPriority = document.createElement("span");
    taskLabelPriority.className = "task-label";
    taskLabelPriority.id = "task-priority";
    taskLabelPriority.innerHTML = `<i class="bi bi-flag"></i> ${task.priority}`;

    // Assembler les éléments
    circularCheckbox.appendChild(checkbox);
    // circularCheckbox.appendChild(spanCheckbox);
    circularCheckbox.appendChild(spanTaskName);

    taskNameContainer.appendChild(circularCheckbox);
    taskNameContainer.appendChild(taskDueDate);

    taskTopLeft.appendChild(taskNameContainer);

    taskTopRight.appendChild(editIcon);
    taskTopRight.appendChild(deleteIcon);

    taskTop.appendChild(taskTopLeft);
    taskTop.appendChild(taskTopRight);

    taskBottom.appendChild(taskDescription);
    taskBottom.appendChild(taskProject);
    taskProject.appendChild(taskLabel);
    taskProject.appendChild(taskLabelPriority);

    taskItem.appendChild(taskTop);
    taskItem.appendChild(taskBottom);

    // Ajouter la tâche à la liste principale
    document.querySelector(".main-task-list").appendChild(taskItem);
  }

  removeTask(taskName) {
    this.tasks = this.tasks.filter((task) => task.id !== taskName);
  }

  editTask(taskName) {}

  getTasks() {
    return this.tasks;
  }
}
