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
const CURRENT = document.querySelector(".currently");
const PAST = document.querySelector(".past");

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
        addToLocalStorage();
        defaultMode();

    }
    else if(todo && editFlag){

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
    TASKSHOW.removeChild(elem);
    displayAlert("item deleted", "good");
    totalTask();
    deleteFromLocalStorage();
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
    elem.classList.toggle("activebtn");
    elem.nextElementSibling.classList.toggle("done");
    elemChild = elem.querySelector(".checked");
    elemChild.classList.toggle("invisible");
    elem.parentNode.classList.toggle("finished")
}

// function to activate current page or session
function activate(e) {
    CATEGORY.forEach(cat => {
        cat.classList.remove("active");
    })
    e.currentTarget.classList.add("active")


    // to carry out the filtration
    // let todos = Array.from(document.querySelectorAll(".taskVal"));
    let todos = [...document.querySelectorAll(".taskVal")];
    let identity = e.currentTarget.dataset.id;
    
    todos.forEach(task => {
        if(task.classList.contains("finished")) {
            changeDisplay = true;
        }
    })

    if(identity == "active" && changeDisplay) {
        
    }else if( identity == "completed") {
        
    }else {
        
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


// ************LOCAL STORAGE 
// add to local storage function
function addToLocalStorage() {
    console.log("added to local storage baby");
}

// fucuntion to clear local Storage
function clearLocalStorage() {
    console.log("local storage cleared")
}

// function to remove from local storage
function deleteFromLocalStorage() {
    console.log("item deleted from local storage");
}