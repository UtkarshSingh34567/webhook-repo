const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const mongoose = require('./src/db/db'); 
const webhookRouter = require('./src/webhook/router'); 

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');
});

app.use('/github', webhookRouter);

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

module.exports = io; 
