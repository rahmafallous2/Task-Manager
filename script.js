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
            alert("Task can't be empty.");
            return;
        }
        task.text = newText;
        saveTasks();
        renderTasks();
    });
}

function renderTasks(){
    taskList.innerHTML = "";

    let filteredTasks = tasks;
    if(currentFilter === 'completed'){
        filteredTasks = tasks.filter(function(t){ return t.done });
    } else if(currentFilter === 'pending'){
        filteredTasks = tasks.filter(function(t){ return !t.done });
    }

    filteredTasks.forEach(function(task){
        let div = document.createElement('div');
        div.classList.add('task');
        if(task.done) div.classList.add('completed');
        div.setAttribute('data-id', task.id);

        let left = document.createElement('div');
        left.className = 'task-content';

        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.addEventListener('change', function(){
            toggleDone(task.id);
        });

        let span = document.createElement('span');
        span.textContent = task.text;

        left.append(checkbox, span);

        let right = document.createElement('div');
        right.className = 'task-actions';

        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.addEventListener('click', function(){
            editTask(task.id);
        });

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function(){
            deleteTask(task.id);
        });

        right.append(editBtn, deleteBtn);

        div.append(left, right);
        taskList.append(div);
    });
}

renderTasks();