// Functions needed for first load.
loadList();

/*
    BURGER MENU
*/
const btnBurger = document.getElementById('burger');
if(btnBurger !== null) {
    btnBurger.addEventListener('click', function() {
        document.getElementById("sidenav").style.width = "250px";
    }, false);
}

const btnCloseSidenav = document.getElementById('btnCloseSidenav');
if(btnCloseSidenav !== null) {
    btnCloseSidenav.addEventListener('click', function() { 
        document.getElementById("sidenav").style.width = "0";
    }, false);
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

/*
    Make task list control panel visible
*/
function showControlPanel() {
    
}

/*
    Load the name of all the tasks lists for the current user and place it
    in the DOM.
*/
function loadList() {
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
        addEventHandlersToLists();
      }
    };
    xhttp.open("GET", "API/endpoint/getCollection.php", true);
    xhttp.send();
}

/*
    Attach event handlers to the name of each task list. 
*/
function addEventHandlersToLists() {
    const items = document.getElementsByClassName('list');
    const title = document.getElementById('title');

    for(let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function() {
            title.innerHTML = this.id.substring(5);
            loadTasks(this.id);
            document.getElementById("sidenav").style.width = "0";
        }, false);
    }
}

/*
    Load all tasks in a given task list and render it to the DOM.
*/
function loadTasks(listID) {
    const listname = listID.substring(5);
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const obj = JSON.parse(this.responseText);
        let html = addNewTaskControl();
        html += '<div id="tasks">';
        let i = 0;
        for(task in obj) {
            html += '<div class="task" id="task-'+i+'">'+obj[task]["task"]+'</div>';
            i++;
        }
        html += '</div>';
        let todolistDOM = document.getElementById('todolist');
        todolistDOM.innerHTML = html;
        todolistDOM.style.background = 'none';
        todolistDOM.style.justifyContent = 'flex-start';
      }
    };
    xhttp.open("GET", "API/endpoint/getTasksFromList.php?listname="+listname, true);
    xhttp.send();
}

function addNewTaskControl() {
    return `
        <div id="new-task-control">
            <input type="text" id="input-text-task" /><button id="btn-add-task" class="btn btn-ok">+</button>
        </div>`;
}

/*
    Show the window (modal) for creating new task lists.
*/
function showNewListModal() {
    document.getElementById('modal-newlist').style.display = "block";
}

/*
    Cancel button for the create new task list window. 
*/
const btnCloseNewList = document.getElementById('btnCloseNewList');
if(btnCloseNewList !== null) {
    btnCloseNewList.addEventListener('click', function() { 
        closeModal('modal-newlist');
    }, false);
}

/*
    Submit button for the create new task list window. 
*/
const btnSubmitNewList = document.getElementById('btnSubmitNewList');
if(btnSubmitNewList !== null) {
    btnSubmitNewList.addEventListener('click', function() {
        addNewList();
        loadTasks(document.getElementById('txtListName').value);
        closeModal('modal-newlist');
    }, false);    
}

/*
    Uses an AJAX call to create a new task list.
*/
function addNewList() {
    const xhttp = new XMLHttpRequest();
    const listname = document.getElementById('txtListName').value; 
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        loadList();
      }
    };
    xhttp.open("GET", "API/endpoint/createNewList.php?listname="+listname, true);
    xhttp.send();
}