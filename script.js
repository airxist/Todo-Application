// ************ SELECTED ELEMENTS 
const THEMELINK = document.querySelector("#design");
const THEME = document.getElementById("theme");
const FORM = document.querySelector(".form");
const SUBMITBTN = document.querySelector(".submit");
const SUBMITBTNIMG = document.querySelector(".subcheck");
const VALUE = document.querySelector(".task");
const TASKSHOW = document.querySelector(".taskShow");
const LEFTTASK = document.querySelector(".num");
const CATEGORY = document.querySelectorAll(".cat");
const CLEARALL = document.querySelector(".clear");
const ALERT = document.querySelector(".alert");
const ALERTTEXT = document.querySelector(".warning");

// ************* EDIT OPTIONS
let editId = "";
let editFlag = false;
let editItem;
let changeDisplay = false;

// ************ EVENT LISTENERS 
// form submission
FORM.addEventListener("submit", addItem);
CLEARALL.addEventListener("click", eliminateAll);
CATEGORY.forEach(cat => {
    cat.addEventListener("click", activate);
})
THEME.addEventListener("click", changedesign);
window.addEventListener("DOMContentLoaded", showPrevItems)


// ************ FUNCTIONS
// changedesign 
function changedesign() {
    linkage = THEMELINK.getAttribute("href");
    
    if (linkage == "styleslight.css") {
        THEME.src = "images/icon-sun.svg";
        THEMELINK.href = "stylesdark.css";
    }else {
        THEME.src = "images/icon-moon.svg";
        THEMELINK.href = "styleslight.css";
    }
}
function addItem(e) {
    e.preventDefault();
    // getting value
    let todo = VALUE.value;
    let id = new Date().getTime().toString();

    if(todo && !editFlag){
        
        showTask(id, todo);
        displayAlert("task added", "good");
        bleep();
        eliminate();
        totalTask();
        addToLocalStorage(id, todo);
        defaultMode();

    }
    else if(todo && editFlag){
        // will update this later when we get to add the edit feature
    }
    else {
        displayAlert("please input value", "bad")
    }


}

// display alert function 
function displayAlert(text, style) {
    ALERTTEXT.textContent = text;
    ALERT.classList.add(`${style}`);

    // REMOVE ALERT
    setTimeout (() => {
        ALERTTEXT.textContent = "";
        ALERT.classList.remove(`${style}`)
    }, 3000)
}

// default mode function 
function defaultMode() {
    VALUE.value = "";
    changeDisplay = false;
    editId = "";
}

// function acive button
function bleep() {
    SUBMITBTN.classList.add("activebtn");
    SUBMITBTNIMG.classList.remove("invisible");
    // hide the above
    setTimeout(() => {
        SUBMITBTN.classList.remove("activebtn");
        SUBMITBTNIMG.classList.add("invisible");
    }, 1000)
}

// show clear all
function eliminate() {
    TASKSHOW.children.length > 0 ? CLEARALL.classList.remove("invisible") : CLEARALL.classList.add("invisible");
}

// eliminate all children of taskshow
function eliminateAll() {
    let todos = TASKSHOW.querySelectorAll(".taskVal");
    todos.forEach(task => {
        TASKSHOW.removeChild(task);
    })
    eliminate();
    LEFTTASK.textContent = 0;
    displayAlert("empty list and storage", "bad");
    localStorage.clear();
    defaultMode();
}

// function to add total task
function totalTask() {
    let num = 0;
    let todos = TASKSHOW.querySelectorAll(".taskVal");
    todos.forEach(task => {
        num += 1;
    })
    LEFTTASK.textContent = num;
}

//deleting specifice todo
function deletion(e) {
    elem = e.currentTarget.parentNode;
    editId = elem.dataset.id;console.log(editId);
    TASKSHOW.removeChild(elem);
    displayAlert("item deleted", "good");
    totalTask();
    deleteFromLocalStorage(editId);
    eliminate();
    defaultMode();
}

// function for completion of task
function completion(e) {
    elem = e.currentTarget;
    let todos = Array.from(TASKSHOW.querySelectorAll(".check"));
    num = 0;
    todos = todos.map(task => {
        if(elem == task) {
            elementing();
        }

        if (!task.classList.contains("activebtn")) {
            num++;
        }
         
        LEFTTASK.textContent = num;
    })
    
    displayAlert("weldone", "good");
}

// function elementing
function elementing() {
    elem.classList.add("activebtn");
    elem.nextElementSibling.classList.add("done");
    elemChild = elem.querySelector(".checked");
    elemChild.classList.remove("invisible");
    elem.parentNode.classList.add("finished")
}

// function to activate current page or session
function activate(e) {
    // change class to show what page i am on at the momment
    CATEGORY.forEach(cat => {
        cat.classList.remove("active");
    })
    e.currentTarget.classList.add("active")

    let identity = e.currentTarget.dataset.id;

    TODOS = TASKSHOW.querySelectorAll(".taskVal");
    TODOS.forEach(task => {
        if (task.classList.contains("finished")) {
            changeDisplay = true;
        }
    })

    if (identity == "active" && changeDisplay) {
        todos = TASKSHOW.querySelectorAll(".taskVal");
        todos.forEach(task => {
        let taskclass = task.classList;
        if (taskclass.contains("finished")) {
            task.classList.add("hide");
        }
        
        if (!taskclass.contains("finished")) {
            task.classList.remove("hide");
        }
        })
    }else if (identity == "completed" && changeDisplay) {
        todos = TASKSHOW.querySelectorAll(".taskVal");
        todos.forEach(task => {
        let taskclass = task.classList;
        if (taskclass.contains("finished")) {
            task.classList.remove("hide");
        }
        
        if (!taskclass.contains("finished")) {
            task.classList.add("hide");
        }
        })
    }else {
        todos = TASKSHOW.querySelectorAll(".taskVal");
        todos.forEach(task => {
            task.classList.remove("hide");
        })
    }
}

// function show task
function showTask(identity, value) {
    TASKSHOW.innerHTML += `
    <article class="taskVal" data-id="${identity}">
        <button class="check" type="button">
        <img src="images/icon-check.svg" alt="checked" class="checked invisible">
        </button>

        <p class="text">${value}</p>

        <img src="images/icon-cross.svg" alt="" class="delete">
    </article>`

    const DELBTN = document.querySelectorAll(".delete");
    const DONE = document.querySelectorAll(".check");

    // EVENT LISTENERS FOR THE ABOVE
    DELBTN.forEach(del => {
        del.addEventListener("click", deletion);
    })
    
    DONE.forEach(tick => {
        tick.addEventListener("click", completion);
    })
}

// show previous added items
function showPrevItems() {
    TODOS = getLocalStorage();
    TODOS.forEach(task => {
        TASKSHOW.innerHTML += `
        <article class="taskVal" data-id="${task.id}">
            <button class="check" type="button">
            <img src="images/icon-check.svg" alt="checked" class="checked invisible">
            </button>
    
            <p class="text">${task.todo}</p>
    
            <img src="images/icon-cross.svg" alt="" class="delete">
        </article>`

        const DELBTN = document.querySelectorAll(".delete");
        const DONE = document.querySelectorAll(".check");
    
        // EVENT LISTENERS FOR THE ABOVE
        DELBTN.forEach(del => {
            del.addEventListener("click", deletion);
        })
        
        DONE.forEach(tick => {
            tick.addEventListener("click", completion);
        })

    })
    eliminate();
}

// ************LOCAL STORAGE 
// add to local storage function
function addToLocalStorage(id, todo) {
    taskList = {id, todo};
    TODOS = getLocalStorage();
    TODOS.push(taskList);
    localStorage.setItem("tasks", JSON.stringify(TODOS))
}

// fucuntion to clear local Storage will be with the clear all task button;

// function to remove from local storage
function deleteFromLocalStorage(editId) {
    TODOS = getLocalStorage();
    TODOS = TODOS.filter(task => {
        if (editId !== task.id) {
            return task;
        }
    })

    localStorage.setItem("tasks", JSON.stringify(TODOS));
}

// *************** GET LOCAL STORAGE
function getLocalStorage() {
    return localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : TODOS = [];
}