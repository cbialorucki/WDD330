import * as CONST from './const.js';
import ls from './ls.js';
import util from './utilities.js';

export default class ToDos{
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

    _buildTaskObject(taskTitle, isComplete=false){
        return [Date.now(), taskTitle, isComplete]
    }

    createTask(taskTitle, isComplete=false){
        const task = this._buildTaskObject(taskTitle, isComplete)
        this.tasks.push(task);
        this.saveTasks();
        this.htmlList.appendChild(util.buildTaskListItem(...task, this.setCompletetionOfTask.bind(this), this.deleteTask.bind(this)));
    }

    setCompletetionOfTask(taskId, isComplete){
        this.tasks.forEach(item => {
            if(item[0] === taskId)
                item[2] = isComplete;
        });
        this.saveTasks();
    }

    deleteTask(taskId){
        this.tasks.forEach((item, index) => {
            if(item[0] === taskId)
                this.tasks.splice(index, 1);
        });
        this.saveTasks();
    }

    saveTasks(){
        ls.writeToLS(CONST.TODO_LIST_KEY, this.tasks);
        this.updateStatusText();
    }

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