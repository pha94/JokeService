const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static(__dirname + '/FrontEnd'));
app.use(express.json());
app.use('/jokes', require('/jokes'));

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');

module.exports = app; // test