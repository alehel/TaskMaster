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

const btnCloseSidenav = document.getElementById('btn-cancel-newlist');
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
    const modal = document.getElementById('modal-newlist');    
    if (event.target === modal) {
        closeModal('modal-newlist');
    }
}

function showNewListModal() {
    closeSidenav();
    document.getElementById('modal-newlist').style.display = "block";
    document.getElementById('input-text-listname').focus();
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
    xhttp.open("GET", "API/endpoint/getLists.php", true);
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
            html += '<div class="task" id="task-'+i+'"><div>'+obj[task]["task"]+`</div>
                <button class="btn btn-task-toggle" id="toggle-`+obj[task]["taskid"]+`">&#x2713;</button>
            </div>`;
            i++;
        }
        html += '</div>';
        const todolistDOM = document.getElementById('todolist');
        todolistDOM.innerHTML = html;
        todolistDOM.style.background = 'none';
        todolistDOM.style.justifyContent = 'flex-start';
        const tasklistControls = document.getElementById('tasklist-settings');
        tasklistControls.style.display = 'flex';

        addEventHandlersToTasks();
      }
    };
    xhttp.open("GET", "API/endpoint/getTasks.php?listname="+list, true);
    xhttp.send();
}

function addEventHandlersToTasks() {
    const items = document.getElementsByClassName('btn-task-toggle');

    for(let i = 0; i < items.length; i++) {
        items[i].addEventListener('click', function() {
            toggleTaskState(this.id.substring(7));
        }, false);
    }
}

function toggleTaskState(taskId) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        loadTasks(currentList);
      }
    };
    xhttp.open("GET", "API/endpoint/toggleTaskState.php?task_id="+taskId, true);
    xhttp.send();
}

const btnDeleteList = document.getElementById('btn-delete-list');
btnDeleteList.addEventListener('click', function() {
    const result = confirm("Are you sure you want to delete this list? This cannot be undone!");
    if(result) {
        deleteCurrentList();
    }
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
const btnCloseNewList = document.getElementById('btn-cancel-newlist');
btnCloseNewList.addEventListener('click', function() { 
    closeModal('modal-newlist');
}, false);

/*
    Submit button for the create new task list window. 
*/
const btnSubmitNewList = document.getElementById('btn-add-newlist');
btnSubmitNewList.addEventListener('click', function() {
    const listname = document.getElementById('input-text-listname').value; 
    addNewList(listname);
    setCurrentList(listname);
    loadTasks(listname);
    closeModal('modal-newlist');
}, false);

/*
    Logic for editing list names.
*/
const btnEditListName = document.getElementById('btn-edit-name');
btnEditListName.addEventListener('click', function() {
    const titleLabel = document.getElementById('title');
    const btnDelete = document.getElementById('btn-delete-list');

    if(this.innerHTML === 'OK') {
        submitNewListName(this);
    } else {
        let input = '<input class="input-text" id="input-text-edit-listname" value="'+ currentList +'" type="text" name="edit-listname" autocomplete="off">';
        titleLabel.innerHTML = input;
        input = document.getElementById('input-text-edit-listname');
        input.focus();
        input.selectionStart = input.selectionEnd = input.value.length; // places cursor at end of text.
        this.style.backgroundColor = 'rgb(89, 218, 89)';
        this.innerHTML = 'OK';
        input.addEventListener('keyup', function(event) {
            event.preventDefault();
            if(event.keyCode === 13) {
                btnEditListName.click();
            }
        });
        btnDelete.style.display = 'none';
    }
});

function submitNewListName(button) {
    const titleLabel = document.getElementById('title');
    const btnDelete = document.getElementById('btn-delete-list');
    const newName = document.getElementById('input-text-edit-listname').value;
    titleLabel.innerHTML = currentList;
    button.style.backgroundColor = '#343a40';
    button.innerHTML = 'Edit Name';
    btnDelete.style.display = 'inline-block';
    
    const url = "API/endpoint/editListName.php?old_listname="+currentList+"&new_listname="+newName;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) { 
        setCurrentList(newName);
        loadListNames(); 
        loadTasks(newName);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send(); 
}

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
    xhttp.open("GET", "API/endpoint/newList.php?listname="+listname, true);
    xhttp.send();
}

const btnAddTask = document.getElementById('btn-add-task');
btnAddTask.addEventListener('click', function() {
    const task = document.getElementById('input-text-task').value;
    addNewTask(currentList, task);
    document.getElementById('input-text-task').value = "";
});


function addNewTask(currentList, task) {
    const url = "API/endpoint/newTask.php?listname="+currentList+"&task="+task;
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        loadTasks(currentList);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();   
}