// Functions needed for first load.
loadListNames();
let currentList = '';

document.onkeydown = function(evt) {
    if(evt.keyCode == 27) {
        if(newListModalVisible()) {
            closeModal('modal-newlist');
        }
    }
}

function setCurrentList(newCurrentList) {
    currentList = newCurrentList;
    title.innerHTML = currentList;
}

function newListModalVisible() {
    const modal = document.getElementById('modal-newlist');
    return modal.style.display === 'none' ? false : true;
}

document.getElementById('input-text-task')
    .addEventListener("keyup", function(event) {
        event.preventDefault();
        if(event.keyCode === 13) {
            document.getElementById('btn-add-task').click();
        }
});

/*
    BURGER MENU
*/
const btnBurger = document.getElementById('burger');
btnBurger.addEventListener('click', function() {
    document.getElementById("sidenav").style.width = "250px";
}, false);

const btnCloseSidenav = document.getElementById('btnCloseSidenav');
btnCloseSidenav.addEventListener('click', function() { 
    closeSidenav();
}, false);

function closeSidenav() {
    document.getElementById("sidenav").style.width = "0";
}

/*
    MODAL
*/
function closeModal(modalName) {
    const modal = document.getElementById(modalName);    
    modal.style.display = "none";
}

window.onclick = function (event) {
    const modal = document.getElementById('modal-login');    
    if (event.target === modal) {
        closeModal('modal-login');
    }
}



function showNewListModal() {
    document.getElementById('modal-newlist').style.display = "block";
}

/*
    Load the name of all the tasks lists for the current user and place it
    in the DOM.
*/
function loadListNames() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const obj = JSON.parse(this.responseText);
        let htmlList = "";
        if("error" in obj) {
            htmlList = '<div class="sidenav-error">Login to see your task lists.</div>';
        } else {
            htmlList += '<a href="#" id="createTaskList" onclick="showNewListModal();">+ Create task list</a>';
            for(list in obj) {
                htmlList += '<a href="#" id="list-'+obj[list]["listname"]+'" class="list">' + obj[list]["listname"] + '</a>';
            }
        }

        document.getElementById("tasklist").innerHTML = htmlList;
        addEventHandlersToListNames();
      }
    };
    xhttp.open("GET", "API/endpoint/getCollection.php", true);
    xhttp.send();
}

/*
    Attach event handlers to the name of each task list. 
*/
function addEventHandlersToListNames() {
    const items = document.getElementsByClassName('list');
    const title = document.getElementById('title');

    for(let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function() {
            setCurrentList(this.id.substring(5));
            loadTasks(currentList);
            document.getElementById('input-text-task').focus();
            closeSidenav();
        }, false);
    }
}

/*
    Load all tasks in a given task list and render it to the DOM.
*/
function loadTasks(list) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const obj = JSON.parse(this.responseText);
        let html = "";
        html += '<div id="tasks">';
        let i = 0;
        for(task in obj) {
            html += '<div class="task" id="task-'+i+'">'+obj[task]["task"]+'</div>';
            i++;
        }
        html += '</div>';
        const todolistDOM = document.getElementById('todolist');
        todolistDOM.innerHTML = html;
        todolistDOM.style.background = 'none';
        todolistDOM.style.justifyContent = 'flex-start';
        const tasklistControls = document.getElementById('tasklist-settings');
        tasklistControls.style.display = 'flex';
      }
    };
    xhttp.open("GET", "API/endpoint/getTasksFromList.php?listname="+list, true);
    xhttp.send();
}

const btnDeleteList = document.getElementById('delete-list');
btnDeleteList.addEventListener('click', function() {
    deleteCurrentList();
})

function deleteCurrentList() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        location.reload();
      }
    };
    xhttp.open("GET", "API/endpoint/deleteList.php?listname="+currentList, true);
    xhttp.send();
}

/*
    Cancel button for the create new task list window. 
*/
const btnCloseNewList = document.getElementById('btnCloseNewList');
btnCloseNewList.addEventListener('click', function() { 
    closeModal('modal-newlist');
}, false);

/*
    Submit button for the create new task list window. 
*/
const btnSubmitNewList = document.getElementById('btnSubmitNewList');
btnSubmitNewList.addEventListener('click', function() {
    const listname = document.getElementById('txtListName').value; 
    addNewList(listname);
    setCurrentList(listname);
    loadTasks(listname);
    closeModal('modal-newlist');
    closeSidenav();
}, false);    

/*
    Uses an AJAX call to create a new task list.
*/
function addNewList(listname) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        loadListNames(); // refresh the sidenav to show the new list.
      }
    };
    xhttp.open("GET", "API/endpoint/createNewList.php?listname="+listname, true);
    xhttp.send();
}

const btnAddTask = document.getElementById('btn-add-task');
btnAddTask.addEventListener('click', function() {
    const task = document.getElementById('input-text-task').value;
    addNewTask(currentList, task);
    document.getElementById('input-text-task').value = "";
});


function addNewTask(currentList, task) {
    const url = "API/endpoint/addTask.php?listname="+currentList+"&task="+task;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        loadTasks(currentList);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();   
}