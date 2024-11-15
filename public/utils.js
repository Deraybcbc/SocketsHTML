
const socket = io('http://localhost:3000');

let btnEnviar;
let messageInput;
let screenMessage;


function init() {
    btnEnviar = document.querySelector('#btnEnviar');
    messageInput = document.querySelector('#messageInput');
    screenMessage = document.querySelector('#messages');
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

    socket.on('messageBack',(msg)=>{
        console.log("Mensage  llegado Back: ", msg);
        // Crear un nuevo elemento para el mensaje
        const newMessage = document.createElement('p');
        newMessage.textContent = msg;

        // Añadirlo al contenedor de mensajes
        screenMessage.appendChild(newMessage);
    })

    socket.on('disconnect', () => {
        console.log('Desconectado del servidor');
    });
});