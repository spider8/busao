const express = require('express');
const path = require('path');
const app = express();

const PORT = 8080;

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname,'public', 'index.html'));
});

app.listen(PORT, ()=>{
	console.log("Servidor no ar..");
	});
