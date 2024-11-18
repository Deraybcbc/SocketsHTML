
const socket = io('http://localhost:3000');

let btnEnviar;
let messageInput;
let screenMessage;
let bienvenida;
let btnLogOut;


function init() {
    btnEnviar = document.querySelector('#btnEnviar');
    messageInput = document.querySelector('#messageInput');
    screenMessage = document.querySelector('#messages');
    bienvenida = document.querySelector('#bienvenida');
    btnLogOut = document.querySelector('#btnLogOut');
}

function enviarMessage() {
    btnEnviar.addEventListener('click', function () {
        //event.preventDefault();  // Prevenir el comportamiento por defecto del formulario (recargar la página)
        const user = localStorage.getItem('user');

        if (messageInput.value === '') {
            window.alert('Introduce un mensaje')
        } else {
            socket.emit('messageHTML', {
                id: socket.id,
                user: user,
                message: messageInput.value
            });
        }

        messageInput.value = '';
    })
}

function logout() {
    btnLogOut.addEventListener('click', function () {
        localStorage.removeItem('user');


        socket.on('disconnect', () => {
            console.log('Desconectado del servidor');
        });

        window.location.href = '/index.html'

    })
}


document.addEventListener('DOMContentLoaded', function () {
    const user = localStorage.getItem('user');
    if (user) {
        init();
        enviarMessage();
        logout();
        
        bienvenida.textContent = `Bienvenido ${user}`


        socket.on('connection', () => {
            console.log("conectado al servidor", socket.id);
        });

        socket.on('messageBack', (msg) => {
            // Crear un nuevo elemento para el mensaje
            const newMessage = document.createElement('li');
            newMessage.textContent = `${msg.user}: ${msg.message}`; // Formato del mensaje

            // Añadirlo al contenedor de mensajes
            screenMessage.appendChild(newMessage);

        });
    } else {
        window.location.href = '/index.html'
    }

});