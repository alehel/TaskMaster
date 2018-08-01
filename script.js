let btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener('click', function() { 
    document.getElementById('modal-login').style.display = "block";
}, false);

function showModal() {
    document.getElementById('modal-login').style.display = "block";
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

/* Set the width of the side navigation to 250px */
function showSidenav() {
    document.getElementById("sidenav").style.width = "250px";
}

/* Set the width of the side navigation to 0 */
function closeSidenav() {
    document.getElementById("sidenav").style.width = "0";
}
