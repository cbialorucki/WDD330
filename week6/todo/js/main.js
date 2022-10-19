const TODO_LIST_KEY = "tasks";
let tasks = window.localStorage.getItem(TODO_LIST_KEY)? JSON.parse(window.localStorage.getItem(TODO_LIST_KEY)) : [];

console.log(tasks);
rebuildTodoList();

function rebuildTodoList(){
    tasks.forEach((item) => {
        _createTaskItem(...item);
    });
}

function taskSubmit(){
    createTask(document.getElementById('taskText').value)
    document.getElementById('taskText').value = "";
}

function createTask(taskName, isComplete = false, id = Date.now()){
    _createTaskItem(taskName, isComplete, id);
    tasks.push([taskName, isComplete, id]);
    saveTasks();
}

function _createTaskItem(taskName, isComplete = false, id = Date.now()){
    const idForCheckbox = `task${id}`;
    const parent = document.createElement('li');

    const taskTitle = document.createElement('label');
    taskTitle.innerText = taskName;
    taskTitle.setAttribute('for', idForCheckbox);

    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.setAttribute('name', 'todoItems');
    checkbox.setAttribute('id', idForCheckbox);
    
    if(isComplete){
        parent.classList.add('completed');
        checkbox.setAttribute('checked', true);
    }
    checkbox.onclick = function(){
        this.parentNode.classList.toggle('completed');
        setCompletionStatus(taskName, checkbox.checked);
    };

    const deleteButton = document.createElement('input');
    deleteButton.setAttribute('type', 'submit');
    deleteButton.setAttribute('value', '❌');
    deleteButton.onclick = function(){
        removeTaskFromList(taskName);
        this.parentNode.remove();
    };

    parent.appendChild(checkbox);
    parent.appendChild(taskTitle);
    parent.appendChild(deleteButton);

    document.getElementById('taskList').appendChild(parent);
}

function removeTaskFromList(taskName){
    tasks.forEach((item, index)=>{
        if(item[0] === taskName){
            tasks.splice(index, 1);
        }
    });
    saveTasks();
    console.log(tasks);
}

function setCompletionStatus(taskName, value){
    tasks.forEach((item, index)=>{
        if(item[0] === taskName){
            tasks[index][1] = value;
        }
    });
    saveTasks();
    console.log(tasks);
}

function saveTasks(){
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(tasks));
}

function filterViewChanged(radio){
    switch(radio.value){
        case 'all':
            document.getElementById('allLabel').classList.add('highlightLabel');
            document.getElementById('activeLabel').classList.remove('highlightLabel');
            document.getElementById('completedLabel').classList.remove('highlightLabel');
            break;
        case 'active':
            document.getElementById('activeLabel').classList.add('highlightLabel');
            document.getElementById('completedLabel').classList.remove('highlightLabel');
            document.getElementById('allLabel').classList.remove('highlightLabel');
            break;
        case 'completed':
            document.getElementById('completedLabel').classList.add('highlightLabel');
            document.getElementById('activeLabel').classList.remove('highlightLabel');
            document.getElementById('allLabel').classList.remove('highlightLabel');
            break;
    }
}