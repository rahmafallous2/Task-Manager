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
    renderTasks();
   
});

function deleteTask(id){
    tasks = tasks.filter(function(task){ return task.id !== id });
    saveTasks();
    renderTasks();
}

function toggleDone(id){
    tasks = tasks.map(function(task){
        if(task.id === id){
            task.done = !task.done;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}
function editTask(id){
    let taskEl = document.querySelector([data-id='${id}']);
    let task = tasks.find(function(t){ return t.id === id });

    let input = document.createElement('input');
    input.type = 'text';
    input.value = task.text;
    input.className = 'edit-input';

    let saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.className = 'save-btn';

    let container = taskEl.querySelector('.task-content');
    container.innerHTML = '';
    container.append(input, saveBtn);

    saveBtn.addEventListener('click', function(){
        let newText = input.value.trim();
        if(!newText){
            alert("Task cannot be empty.");
            return;
        }
        task.text = newText;
        saveTasks();
        renderTasks();
    });
}
