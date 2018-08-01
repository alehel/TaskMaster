let btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function() { 
    document.getElementById('modal-login').style.display = "block";
}, false);

let btnBurger = document.getElementById('burger');
btnBurger.addEventListener('click', function() { 
    document.getElementById("sidenav").style.width = "250px";
}, false);

let btnCloseSidenav = document.getElementById('btnCloseSidenav');
btnCloseSidenav.addEventListener('click', function() { 
    document.getElementById("sidenav").style.width = "0";
}, false);

let btnCloseLogin = document.getElementById('btnCloseLogin');
btnCloseLogin.addEventListener('click', function() { 
    closeModal();
}, false);

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