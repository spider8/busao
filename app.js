var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var https = require('https');

var PORT = 8080;

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname,'public', 'index.html'));
});

https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(PORT, ()=>{
			console.log("Servidor no ar..");
		});

