let btnAcceder;
let inputName;
const socket = io('http://localhost:3000');



function init() {
    console.log("init");
    btnAcceder = document.querySelector('#btnAcceder');
    inputName = document.querySelector('#name');
}

function login() {
    btnAcceder.addEventListener('click', function () {

        if (inputName.value == '') {
            window.alert('No puedo estar vacio el campo')
        } else {
            console.log(inputName.value);

            localStorage.setItem('user', inputName.value);

            window.location.href = '/chat.html';
        }

        inputName.value = '';
    });
}


document.addEventListener('DOMContentLoaded', function () {
    init();
    login();
});