import ls from './ls.js';
import * as CONST from './const.js';

export default class utilities{

    /*
    * Handles the task submission UI elements
    * 
    * @param {string} key The key under which the value is stored under in LS
    * @param {array} data The information to be stored as an array of objects.
    */
    static submitTaskUIHandler(taskSubmitButton, taskTextInput, callback){
        taskSubmitButton.onclick = submitTask;
        taskTextInput.onkeypress = function(e){
            if(e.key === "Enter")
                submitTask();
        };

        function submitTask(){
            if(taskTextInput.value !== ""){
                callback(taskTextInput.value);
                taskTextInput.value = "";
            }
        }
    }

    /*
    * Handles the filtering UI elements
    * 
    * @param {string} key The key under which the value is stored under in LS
    * @param {array} data The information to be stored as an array of objects.
    */
    static filterUIHandler(radioButtons, taskList){
        for(const radioButton of radioButtons){
            radioButton.addEventListener('change', setHighlight);
        }

        if(ls.readFromLS(CONST.LAST_FILTER_KEY))
            changeSelection(ls.readFromLS(CONST.LAST_FILTER_KEY));
        else{
            selectByIndex(0);
        }

        function changeSelection(value){
            radioButtons.forEach((item, index) => {
                if(item.value === value){
                    selectByIndex(index);
                }
            });
        }

        function selectByIndex(index){
            radioButtons[index].checked = true;
            radioButtons[index].dispatchEvent(new Event("change"));
        }

        function setHighlight(){
            for(const radioButton of radioButtons)
                radioButton.labels[0].classList.remove('highlightLabel');
            if (this.checked)
                this.labels[0].classList.add('highlightLabel');

            filterViewChanged(this);
        }

        function filterViewChanged(radio){
            const viewItems = taskList.querySelectorAll('li');
            ls.writeToLS(CONST.LAST_FILTER_KEY, radio.value);
            switch(radio.value){
                case 'all':
                    viewItems.forEach((item) => {
                        item.style.display = 'flex';
                    });
                    break;
                case 'active':
                    viewItems.forEach((item) => {
                        if(item.querySelector("input[type='checkbox']").checked)
                            item.style.display = 'none';
                        else
                            item.style.display = 'flex';
                    });
                    break;
                case 'completed':
                    viewItems.forEach((item) => {
                        if(item.querySelector("input[type='checkbox']").checked)
                            item.style.display = 'flex';
                        else
                            item.style.display = 'none';
                    });
                    break;
            }
        }
    }

    /*
    * Builds a view of a task item
    * 
    * @param {string} key The key under which the value is stored under in LS
    * @param {array} data The information to be stored as an array of objects.
    * @return {array} The value as an array of objects
    */
    static buildTaskListItem(taskId, taskTitle, isComplete = false, completeCallback = null, deleteCallback = null){
        const idForCheckbox = `task${taskId}`;
        const parent = document.createElement('li');

        const taskLabel = document.createElement('label');
        taskLabel.innerText = taskTitle;
        taskLabel.setAttribute('for', idForCheckbox);

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
            completeCallback(taskId, checkbox.checked);
        };

        const styleCheckbox = document.createElement('span');
        styleCheckbox.innerText = "✓";
        styleCheckbox.classList.add('styledCheckbox');

        const deleteButton = document.createElement('input');
        deleteButton.setAttribute('type', 'submit');
        deleteButton.setAttribute('value', '🗙');
        deleteButton.setAttribute('title', 'Delete Task');
        deleteButton.onclick = function(){
            deleteCallback(taskId);
            this.parentNode.remove();
        };

        parent.appendChild(checkbox);
        parent.appendChild(styleCheckbox);
        parent.appendChild(taskLabel);
        parent.appendChild(deleteButton);

        return parent;
    }
}