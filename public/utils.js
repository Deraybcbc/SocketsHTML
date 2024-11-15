
const socket = io('http://localhost:3000');

let btnEnviar;
let messageInput


function init() {
    btnEnviar = document.querySelector('#btnEnviar');
    messageInput = document.querySelector('#messageInput');

}

function enviarMessage() {
    btnEnviar.addEventListener('click', function () {

        event.preventDefault();  // Prevenir el comportamiento por defecto del formulario (recargar la página)

        console.log("Hola");

        console.log("FRONT: ",messageInput.value);
        
        socket.emit('messageHTML', messageInput.value);
        messageInput.value = '';
    })
}



document.addEventListener('DOMContentLoaded', function () {
    init();
    enviarMessage();

    socket.on('connection', () => {
        console.log("conectado al servidor");
    });

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    });
});