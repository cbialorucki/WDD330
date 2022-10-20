import util from './modules/utilities.js'
import todo from './modules/ToDos.js';

let currentTodo = new todo(document.getElementById('taskList'), document.getElementById('tasksLeft'));

util.submitTaskUIHandler(document.getElementById('submitTask'), document.getElementById('taskText'), function(value){currentTodo.createTask(value)});
util.filterUIHandler(document.querySelectorAll('input[name="filterView"]'), document.getElementById('taskList'));