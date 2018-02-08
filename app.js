var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var startLocation = {
    lat: -8.399301,
    lng: -35.056784
};

server.listen(3333, function () {
    console.log("Server online...");
});

app.use(express.static('public'));
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', function (socket) {
    console.log("New user connect.");

    let interval = setInterval(function () {
        io.emit('location', {
            lat: startLocation.lat += 0.0001,
            lng: startLocation.lng += 0.0001,
        });
    }, 5000);

    socket.on("disconnect", function () {
        console.log("Disconected.")
        clearInterval(interval);
    })
});
