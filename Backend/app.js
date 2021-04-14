const controller = require('../Controller/controller');
const express = require('express');
const app = express();
const config = require('./config');

app.use(express.static(__dirname + '/FrontEnd'));
app.use(express.json());
app.use('/jokes', require('/jokes'));

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log('Listening on port ' + port + ' ...');



app.get("/", async (request, response) => {
    try {
        let jokes = await controller.getJokes();
        response.send(jokes);
    } catch (e) {
        sendStatus(e, response);
    }
});

app.post("/", async (request, response) => {
    try {
        let { name, setup, punchline } = request.body;
        await controller.createJoke(name, setup, punchline);
        response.send({ message: "Joke saved!" });
    } catch (e) {
        sendStatus(e, response);
    }
});

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
    
    module.exports = app; // test