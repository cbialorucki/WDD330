import ls from './ls.js';
import * as CONST from './const.js';

/**
 * A class used to handle UI features as part of the ToDo application.
 * @module utilities
 */
export default class utilities{

    /**
    * Handles the task submission UI elements.
    * 
    * @param {HTMLButtonElement} taskSubmitButton The button used to submit the task.
    * @param {HTMLInputElement} taskTextInput The input used to collect the task title.
    * @param {CallableFunction} callback The callback used when a task title is valid and added.
    */
    static submitTaskUIHandler(taskSubmitButton, taskTextInput, callback){
        taskSubmitButton.onclick = submitTask;
        taskTextInput.addEventListener("keypress", function(e){
            if(e.key === "Enter")
                submitTask();
        });

        function submitTask(){
            if(taskTextInput.value !== ""){
                callback(taskTextInput.value);
                taskTextInput.value = "";
            }
        }
    }

    /**
    * Handles the UI elements to filter tasks.
    * 
    * @param {HTMLCollection} radioButtons The radio buttons used to filter between views.
    * @param {HTMLUListElement} taskList The list where tasks are displayed.
    */
    static filterUIHandler(radioButtons, taskList){
        for(const radioButton of radioButtons){
            radioButton.addEventListener('change', setHighlight);
        }

        // Sets the filter to the last selected option.
        if(ls.readFromLS(CONST.LAST_FILTER_KEY))
            changeSelection(ls.readFromLS(CONST.LAST_FILTER_KEY));
        else
            selectByIndex(0);

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

    /**
    * Builds a view of a task item.
    * 
    * @param {number} taskId The ID associated with the task.
    * @param {string} taskTitle The title of the task.
    * @param {boolean} isComplete True if the task was completed, false if it was not.
    * @param {CallableFunction} completeCallback The callback for when the task is completed.
    * @param {CallableFunction} deleteCallback The callback for when the task is deleted.
    * @return {HTMLLIElement} The list item view for the task.
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