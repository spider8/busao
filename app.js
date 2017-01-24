var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    http = require('http');

var app = express(),
    httpApp = express();

https = require('https').createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
}, app);

httpApp.set('port', process.env.PORT || 80);
httpApp.get("*", function(req, res, next) {
    res.redirect("https://" + req.headers.host + req.path);
});

app.set('port', process.env.PORT || 443);
app.use(express.static('public'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

var io = require('socket.io')(https);

io.on('connection', function(socket) {
    console.log('Um usuario se conectou..');
    socket.on('disconnect', function() {
        console.log("Usuario desconectou..");
    })
});

http.createServer(httpApp).listen(httpApp.get('port'), function() {
    console.log('Express HTTP server listening on port ' + httpApp.get('port'));
});

https.listen(app.get('port'), function() {
    console.log('Express HTTPS server listening on port ' + app.get('port'));
});
