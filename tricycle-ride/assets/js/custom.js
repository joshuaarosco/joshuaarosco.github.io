function displayError(message){
    var r = document.querySelector('.card-body');
    r.style.setProperty('display', 'inline');
    r.style.setProperty('opacity', '75%');
    r.style.setProperty('color', 'red');
    r.style.setProperty('background-color', 'rgb(255, 240, 240)');
    r.innerHTML = message;
}

function formatPhone(phone){
    return phone.replaceAll(' ','').replace('(','').replace(')','').replace('+','').replaceAll('-','');
}