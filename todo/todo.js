const { log } = require('console');
const fs = require('fs');
const filePath = "./tasks.json";

// TO load tasks from file
const loadTasks = () => {
    try {
       const databuffer = fs.readFileSync(filePath);
       const dataJSON = databuffer.toString();
       return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
};

// To save the tasks into the file
const saveTasks = (tasks) => {
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
};

// To add the tasks into the file
const addTask = (task) => {
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task added", task);
    
};
const listTasks = () => {
    const tasks = loadTasks();
    tasks.forEach((task, index) => console.log(`${index +1} -${task.task}`));
}
const removeTask = (index) => {
    const tasks = loadTasks();
    if(index > 0 && index <= tasks.length) {
        tasks.splice(index -1 , 1);
        saveTasks(tasks);
        console.log("Task removed");
    } else {
        console.log("Invalid task number");
    }
};

const command = process.argv[2];
const argument = process.argv[3];


if(command === "add") {
    addTask(argument);
} else if(command === "list") {
    listTasks();
} else if(command === "remove") {
    removeTask(parseInt(argument));
}else {
    console.log("Invalid command");
}