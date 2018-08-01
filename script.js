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
        closeModal();
    }, false);
}

function closeModal() {
    let modal = document.getElementById('modal-login');    
    modal.style.display = "none";
}

window.onclick = function (event) {
    let modal = document.getElementById('modal-login');    
    if (event.target === modal) {
        closeModal();
    }
}