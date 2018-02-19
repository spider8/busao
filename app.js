const express = require('express');
const app = express();
const morgan = require('morgan');
const server = require('http').Server(app);
const io = require('socket.io')(server);
const locations = require('./mock_position_ufrpe');

let index = 0;
let interval = setInterval(function () {
    io.emit('location', locations[index]);
    index++;
    index %= locations.length;
}, 4000);

server.listen(3333, function () {
    console.log("Server online...");
});

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', function (socket) {
    console.log("New user connect.");

    socket.emit('ready');
    socket.on("disconnect", function () {
        console.log("Disconected.")
    })
});