const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "tasks.json");

let tasks = [];

if (fs.existsSync(filePath)) {
  const data = fs.readFileSync(filePath, "utf-8");

  tasks = JSON.parse(data || "[]");
}

const [, , action, ...arg] = process.argv;

switch (action) {
  case "add":
    addTask(arg.join(" "));
    break;

  case "update":
    upDateTask(arg);
    break;

  case "mark-in-progress":
    markInProgress(parseInt(arg));
    break;

  case "mark-done":
    markDone(parseInt(arg));
    break;

  case "remove":
    removeTask(arg);
    break;

  case "list":
    listTasks(arg.join(" "));
    break;

  default:
    break;
}

function addTask(task) {
  const newTask = {
    id: tasks.length + 1,
    description: task,
    completed: "pending",
  };
  tasks.push(newTask);

  saveFile();
  listTasks()
}

function upDateTask(arg) {
  const id = parseInt(arg[0]);
  const newDescription = arg[1];
  const newTask = tasks.find((task) => task.id === id);
  if (newTask) {
    newTask.description = newDescription;
  }
  saveFile();
}

function markInProgress(id) {
  console.log(id);
  const inProgress = tasks.find((task) => task.id === id);
  if (inProgress) {
    inProgress.completed = "inProgress";
  }
  saveFile();
  console.log(`${inProgress.description} - ${inProgress.completed}`);
}

function markDone(id) {
  console.log(id);
  const processDone = tasks.find((task) => task.id === id);
  if (processDone) {
    processDone.completed = "Done";
  }
  saveFile();
  console.log(`${processDone.description} - ${processDone.completed}`);
}

function removeTask(id) {
  if (id.join(" ") === "all") {
    tasks = [];
    return saveFile();
  }
  let parseId = parseInt(id);
  const taskLength = tasks.length;
  tasks = tasks.filter((task) => task.id !== parseId);
  if (tasks.length < taskLength) {
    saveFile();
    console.log(`Item${parseId} successfully Removed`);
  } else {
    console.log(`Item${parseId} Not found`);
  }
}

function listTasks(task) {
  if (!task) {
    if (tasks.length > 0) {
      tasks.forEach((task) => {
        console.log(
          `${task.id} : ${task.description} Completed - ${task.completed}`
        );
      });
    } else {
      console.log("No Tasks Found");
    }
  } else if (task === "done") {
    tasks = tasks.filter((task) => task.completed === "Done");
    tasks.forEach((task) => {
      console.log(`${task.id} : ${task.description} - ${task.completed}`);
    });
  } else if (task === "not-done") {
    tasks = tasks.filter(
      (task) => task.completed === "pending" || task.completed === "inProgress"
    );
    tasks.forEach((task) => {
      console.log(`${task.id} : ${task.description} - ${task.completed}`);
    });
  } else if (task === "in-progress") {
    tasks = tasks.filter((task) => task.completed === "in-progress");
    tasks.forEach((task) => {
      console.log(`${task.id} : ${task.description} - ${task.completed}`);
    });
  }
}

function saveFile() {
  fs.writeFileSync(filePath, JSON.stringify(tasks), "utf-8", (err) => {
    if (err) {
      throw err;
    }
    console.log("File has been saved");
  });
}
