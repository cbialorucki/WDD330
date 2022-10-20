import * as CONST from './const.js';
import ls from './ls.js';
import util from './utilities.js';

/**
 * A class used to represent the list of tasks in the ToDo web application.
 * @module ToDos
 */
export default class ToDos{
    /**
     * @constructor
     * Constructs the ToDo object.
     * @param {HTMLUListElement} list The list to insert each task view into.
     * @param {HTMLParagraphElement} status The element used to notify the user how many tasks are left.
     */
    constructor(list, status){
        this.htmlList = list;
        this.htmlStatus = status;
        if(ls.readFromLS(CONST.TODO_LIST_KEY))
            this.tasks = ls.readFromLS(CONST.TODO_LIST_KEY);
        else
            this.tasks = [];
        
        this.tasks.forEach(item => {
            this.htmlList.appendChild(util.buildTaskListItem(...item, this.setCompletetionOfTask.bind(this), this.deleteTask.bind(this)));
        });
        this.updateStatusText();
    }

    /**
     * Creates a task object
     * @param {string} taskTitle The title of the task.
     * @param {boolean} isComplete True if the task is complete, false if it is not.
     * @returns {Object} The created task.
     */
    _buildTaskObject(taskTitle, isComplete=false){
        return [Date.now(), taskTitle, isComplete]
    }

    /**
     * Used to create a task and update the HTML view.
     * @param {string} taskTitle The title of the task.
     * @param {boolean} isComplete True if the task is complete, false if it is not.
     */
    createTask(taskTitle, isComplete=false){
        const task = this._buildTaskObject(taskTitle, isComplete)
        this.tasks.push(task);
        this.saveTasks();
        const taskView = util.buildTaskListItem(...task, this.setCompletetionOfTask.bind(this), this.deleteTask.bind(this))
        this.htmlList.appendChild(taskView);
        taskView.scrollIntoView();
    }

    /**
     * Sets the completion status of a task.
     * @param {number} taskId The ID of the task to manipulate.
     * @param {boolean} isComplete True if the task is complete, false if it is not.
     */
    setCompletetionOfTask(taskId, isComplete){
        this.tasks.forEach(item => {
            if(item[0] === taskId)
                item[2] = isComplete;
        });
        this.saveTasks();
    }

    /**
     * Deletes a task.
     * @param {number} taskId The ID of the task to delete.
     */
    deleteTask(taskId){
        this.tasks.forEach((item, index) => {
            if(item[0] === taskId)
                this.tasks.splice(index, 1);
        });
        this.saveTasks();
    }

    /**
     * Saves the current tasks to localStorage.
     */
    saveTasks(){
        ls.writeToLS(CONST.TODO_LIST_KEY, this.tasks);
        this.updateStatusText();
    }

    /**
     * Updates the text status of how many tasks are remaining. 
     */
    updateStatusText(){
        let numOfTasks = 0;
        this.tasks.forEach(element => {
            if(element[2] == false){
                numOfTasks += 1;
            }
        });

        if (numOfTasks == 1)
            this.htmlStatus.innerText = "1 task left";
        else
            this.htmlStatus.innerText = `${numOfTasks} tasks left`;
    }
    
}