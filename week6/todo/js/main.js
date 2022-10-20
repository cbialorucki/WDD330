import util from './modules/utilities.js'
import todo from './modules/ToDos.js';

//Creates the current ToDo Object.
let currentTodo = new todo(document.getElementById('taskList'), document.getElementById('tasksLeft'));

//Calls the utility functions to handle the dynamic UI elements of the page.
util.submitTaskUIHandler(document.getElementById('submitTask'), document.getElementById('taskText'), function(value){currentTodo.createTask(value)});
util.filterUIHandler(document.querySelectorAll('input[name="filterView"]'), document.getElementById('taskList'));