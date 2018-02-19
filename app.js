var express = require('express');
var app = express();
var morgan = require('morgan');
var server = require('http').Server(app);
var io = require('socket.io')(server);

//Coordenadas Ceagri 2
var startLocation = {
    lat: -8.014272,
    lng: -34.950131
};

var interval = setInterval(function () {
    io.emit('location', {
        lat: startLocation.lat += 0.0001,
        lng: startLocation.lng += 0.0001,
    });
}, 5000);

server.listen(3333, function () {
    console.log("Server online...");
});

app.use(morgan('dev'));
app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', function (socket) {
    console.log("New user connect.");

    socket.on("disconnect", function () {
        console.log("Disconected.")
    })
});
