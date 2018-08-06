function validateFormLogin() {
    const txtEmail = document.getElementById('input-text-email').value;
    const txtPassword = document.getElementById('input-text-password').value;
    const emailOk = validateEmail(txtEmail);
    const passwordOk = validatePassword(txtPassword);

    if(!emailOk && !passwordOk) {
        alert('There is a problem with the email and password. Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.');
        return false;
    } else if (!emailOk) {
        alert('There is a problem with the email.');
        return false;
    } else if (!passwordOk) {
        alert('Password must be at least 6 characters, no more than 16 characters, and must include at least one upper case letter, one lower case letter, and one numeric digit.');
        return false;
    } else {
        return true;
    }
}

function validateFormRegister() {
    const txtPassword = document.getElementById('input-text-password').value;
    const txtPasswordRepeat = document.getElementById('input-text-password-repeat').value;

    if(txtPassword !== txtPasswordRepeat) {
        alert('Passwords do not match!');
        return false;
    } else {
        return validateFormLogin();
    }
    
}

function validateEmail(email) {
    const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(email);
}

function validatePassword(password) {
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
    return regexPassword.test(password);
}