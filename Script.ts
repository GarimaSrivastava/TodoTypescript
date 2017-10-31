interface ItodoTask{
    task:string;
    completed:boolean;
}
class todoTask{
    sizeOfArray:number;
    task:string[];
    completed:boolean[];

    constructor(length:number,task:string[],completed:boolean[]){
        this.task=task;
        this.completed=completed;
        this.sizeOfArray=length;
    }

    addTask(newTask:ItodoTask){
        this.task[this.sizeOfArray]=(newTask.task);
        this.completed[this.sizeOfArray]=(false);
        this.sizeOfArray=this.sizeOfArray+1;

        localStorage.setItem('key',JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    }

    displayTasks(){
        var itr:number;
        itr=0;
        var listid = document.getElementById("activelist");
        var completedlistid = document.getElementById("completedlist");
        var inputid = document.getElementById("input");
        listid.innerHTML="";
        completedlistid.innerHTML="";
        var localstorage = JSON.parse(localStorage.getItem("key"));
        while(itr<localstorage.locallength){
            var ul=document.createElement("ul");

            var checkbox = document.createElement("input");
            checkbox.setAttribute("type","checkbox");
            checkbox.setAttribute("onchange","updateTaskOuter("+itr+")");
            checkbox.setAttribute("class","checkbox-inline");

            var text = document.createElement("text");
            text.innerText=" "+localstorage.localtask[itr]+" ";

            var button=document.createElement("button");
            button.setAttribute("onclick","deleteTaskOuter("+itr+")");
            button.innerText="Delete";
            button.setAttribute("class","btn btn-default");

            var updatebutton=document.createElement("button");
            updatebutton.setAttribute("onclick","editTaskOuter("+itr+")");
            updatebutton.innerText="Update";
            updatebutton.setAttribute("class","btn btn-default");

            if(localstorage.localcompleted[itr]) {
                checkbox.setAttribute("checked", "TRUE");
                text.setAttribute("class","text-success");
            }
            else{
                text.setAttribute("class","text-primary");
            }

            ul.appendChild(checkbox);
            ul.appendChild(text);
            ul.appendChild(button);
            ul.appendChild(updatebutton);
            if(localstorage.localcompleted[itr])
                completedlistid.appendChild(ul);
            else
                listid.appendChild(ul);

            itr++;
        }
    }

    deleteTask(index:number){
        var itr:number;
        itr=index;
        while(itr+1<this.completed.length)
        {
            this.task[itr]=this.task[itr+1];
            this.completed[itr]=this.completed[itr+1];
            itr++;
        }
        this.sizeOfArray--;
        localStorage.setItem('key',JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    }
    updateTask(index:number){
        this.completed[index]=!this.completed[index];
        localStorage.setItem('key',JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    }
    editTask(index:number){
        if(this.completed[index]==(false)) {
            var prompt1 = prompt("Enter todo title", this.task[index]);
            if (prompt1 != null) {
                this.task[index] = prompt1;
            }
        }
        localStorage.setItem('key',JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    }
}
var localstorage = JSON.parse(localStorage.getItem("key"));
if(localstorage==null)
    var todoObject = new todoTask(0,[],[]);
else
    var todoObject = new todoTask(localstorage.locallength,localstorage.localtask,localstorage.localcompleted);
var addTaskOuter = function(task:string , completed:boolean){
    todoObject.addTask({
        task:task,
        completed:false
    });
}
var updateTaskOuter = function(index:number){
    todoObject.updateTask(index);
}

var deleteTaskOuter = function(index:number){
    todoObject.deleteTask(index);
}
var displayTaskOuter = function(){
    todoObject.displayTasks();
}
var editTaskOuter = function(index:number){
    todoObject.editTask(index);
}