let btnLogin = document.getElementById('btnLogin');
if(btnLogin !== null) {
    btnLogin.addEventListener('click', function() { 
        document.getElementById('modal-login').style.display = "block";
    }, false);
}

let btnBurger = document.getElementById('burger');
if(btnBurger !== null) {
    btnBurger.addEventListener('click', function() {
        document.getElementById("sidenav").style.width = "250px";
    }, false);
}

let btnCloseSidenav = document.getElementById('btnCloseSidenav');
if(btnCloseSidenav !== null) {
    btnCloseSidenav.addEventListener('click', function() { 
        document.getElementById("sidenav").style.width = "0";
    }, false);
}

let btnCloseLogin = document.getElementById('btnCloseLogin');
if(btnCloseLogin !== null) {
    btnCloseLogin.addEventListener('click', function() { 
        closeModal('modal-login');
    }, false);
}

function closeModal(modalName) {
    let modal = document.getElementById(modalName);    
    modal.style.display = "none";
}

window.onclick = function (event) {
    let modal = document.getElementById('modal-login');    
    if (event.target === modal) {
        closeModal('modal-login');
    }
}

function loadList() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let obj = JSON.parse(this.responseText);
        let htmlList = "";
        if("error" in obj) {
            htmlList = '<div class="sidenav-error">Login to see your task lists.</div>';
        } else {
            htmlList += '<a href="#" id="createTaskList" onclick="showNewListModal();">+ Create task list</a>';
            for(list in obj) {
                htmlList += '<a href="#">' + obj[list]["listname"] + '</a>';
            }
        }

        document.getElementById("tasklist").innerHTML = htmlList;
      }
    };
    xhttp.open("GET", "API/endpoint/getCollection.php", true);
    xhttp.send();
}

loadList();

function showNewListModal() {
    document.getElementById('modal-newlist').style.display = "block";
}

let btnCloseNewList = document.getElementById('btnCloseNewList');
if(btnCloseNewList !== null) {
    btnCloseNewList.addEventListener('click', function() { 
        closeModal('modal-newlist');
    }, false);
}

let btnSubmitNewList = document.getElementById('btnSubmitNewList');

if(btnSubmitNewList !== null) {
    btnSubmitNewList.addEventListener('click', function() {
        addNewList();
        return false;
    }, false);    
}

function addNewList() {
    let xhttp = new XMLHttpRequest();
    let listname = document.getElementById('txtListName').value; 
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {  
        loadList();
      }
    };
    xhttp.open("GET", "API/endpoint/createNewList.php?listname="+listname, true);
    xhttp.send();
    closeModal('modal-newlist');
    return false;
}