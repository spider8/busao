var path = require('path');
var express =  require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = 8080;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', function(socket) {
    console.log('Um usuario se conectou..');
		socket.on('disconnect', function () {
			console.log("Usuario desconectou..");
		})
});

http.listen(PORT, function() {
    console.log("Servidor no ar..");
});
