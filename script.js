const taskForm = document.getElementById('taskform');
const taskInput = document.getElementById('taskinput');
const taskList = document.getElementById('tasklist');
const errorMsg = document.getElementById('error');
const filterBtns = document.querySelectorAll('.filters button');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentFilter = 'all';


function saveTasks(){
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
