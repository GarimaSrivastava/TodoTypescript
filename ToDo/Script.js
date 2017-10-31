var todoTask = /** @class */ (function () {
    function todoTask(length, task, completed) {
        this.task = task;
        this.completed = completed;
        this.sizeOfArray = length;
    }
    todoTask.prototype.addTask = function (newTask) {
        this.task[this.sizeOfArray] = (newTask.task);
        this.completed[this.sizeOfArray] = (false);
        this.sizeOfArray = this.sizeOfArray + 1;
        localStorage.setItem('key', JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    };
    todoTask.prototype.displayTasks = function () {
        var itr;
        itr = 0;
        var listid = document.getElementById("activelist");
        var completedlistid = document.getElementById("completedlist");
        var inputid = document.getElementById("input");
        listid.innerHTML = "";
        completedlistid.innerHTML = "";
        var localstorage = JSON.parse(localStorage.getItem("key"));
        while (itr < localstorage.locallength) {
            var ul = document.createElement("ul");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("onchange", "updateTaskOuter(" + itr + ")");
            checkbox.setAttribute("class", "checkbox-inline");
            var text = document.createElement("text");
            text.innerText = " " + localstorage.localtask[itr] + " ";
            var button = document.createElement("button");
            button.setAttribute("onclick", "deleteTaskOuter(" + itr + ")");
            button.innerText = "Delete";
            button.setAttribute("class", "btn btn-default");
            var updatebutton = document.createElement("button");
            updatebutton.setAttribute("onclick", "editTaskOuter(" + itr + ")");
            updatebutton.innerText = "Update";
            updatebutton.setAttribute("class", "btn btn-default");
            if (localstorage.localcompleted[itr]) {
                checkbox.setAttribute("checked", "TRUE");
                text.setAttribute("class", "text-success");
            }
            else {
                text.setAttribute("class", "text-primary");
            }
            ul.appendChild(checkbox);
            ul.appendChild(text);
            ul.appendChild(button);
            ul.appendChild(updatebutton);
            if (localstorage.localcompleted[itr])
                completedlistid.appendChild(ul);
            else
                listid.appendChild(ul);
            itr++;
        }
    };
    todoTask.prototype.deleteTask = function (index) {
        var itr;
        itr = index;
        while (itr + 1 < this.completed.length) {
            this.task[itr] = this.task[itr + 1];
            this.completed[itr] = this.completed[itr + 1];
            itr++;
        }
        this.sizeOfArray--;
        localStorage.setItem('key', JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    };
    todoTask.prototype.updateTask = function (index) {
        this.completed[index] = !this.completed[index];
        localStorage.setItem('key', JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    };
    todoTask.prototype.editTask = function (index) {
        if (this.completed[index] == (false)) {
            var prompt1 = prompt("Enter todo title", this.task[index]);
            if (prompt1 != null) {
                this.task[index] = prompt1;
            }
        }
        localStorage.setItem('key', JSON.stringify({
            locallength: this.sizeOfArray,
            localtask: this.task,
            localcompleted: this.completed
        }));
        this.displayTasks();
    };
    return todoTask;
}());
var localstorage = JSON.parse(localStorage.getItem("key"));
if (localstorage == null)
    var todoObject = new todoTask(0, [], []);
else
    var todoObject = new todoTask(localstorage.locallength, localstorage.localtask, localstorage.localcompleted);
var addTaskOuter = function (task, completed) {
    todoObject.addTask({
        task: task,
        completed: false
    });
};
var updateTaskOuter = function (index) {
    todoObject.updateTask(index);
};
var deleteTaskOuter = function (index) {
    todoObject.deleteTask(index);
};
var displayTaskOuter = function () {
    todoObject.displayTasks();
};
var editTaskOuter = function (index) {
    todoObject.editTask(index);
};
