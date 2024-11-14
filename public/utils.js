
const socket = io('http://localhost:3000');

let btnEnviar;
let messageInput


function init() {
    btnEnviar = document.querySelector('#btnEnviar');

    socket.on('connect', () => {
        console.log("conectado al servidor");
    })

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    });
}

function enviarMessage() {
    btnEnviar.addEventListener('click', function () {
        console.log("Hola");

        // messageInput = document.querySelector('#messages');
        // socket.emit('messageHTML', messageInput);
        // messageInput.value = '';
    })
}



document.addEventListener('DOMContentLoaded', function () {
    init();
    enviarMessage();
});