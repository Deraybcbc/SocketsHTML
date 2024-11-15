const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require("socket.io");
const cors = require('cors');  // Importar cors


const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",  // Permitir todas las solicitudes de todos los orígenes
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    }
});

const PORT = 3000;

// Configuración global de CORS para Express
app.use(cors());  // Habilitar CORS para todas las rutas

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
    console.log('a user connected');

    // Escuchar los mensajes enviados desde el cliente
    socket.on('messageHTML', (msg) => {
        console.log('Message recibido: ', msg);

        // Emitir el mensaje a todos los clientes conectados
        io.emit('messageBack', msg);
    });

    // Desconexión del cliente
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

server.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
});