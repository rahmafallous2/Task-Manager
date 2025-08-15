let taskForm = document.getElementById('taskform');
let taskInput = document.getElementById('taskinput');
let taskList = document.getElementById('tasklist');
let errorMsg = document.getElementById('error');
let filterBtns = document.querySelectorAll('.filters button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';

function saveTasks(){
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

taskForm.addEventListener('submit', function(e){
    e.preventDefault();

    let text = taskInput.value.trim();

    if(!text){
        errorMsg.textContent = "Task can't be empty!";
        return;
    }
    errorMsg.textContent = "";

    let newTask = {
        id: Date.now(),
        text: text,
        done: false
    };

    tasks.push(newTask);
    taskInput.value = "";
    saveTasks();
   
});

function deleteTask(id){
    tasks = tasks.filter(function(task){ return task.id !== id });
    saveTasks();
    renderTasks();
}