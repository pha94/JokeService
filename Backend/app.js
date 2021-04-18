import { getJokes, createJoke } from "../Controller/controller.js";
import { express, static, json } from "express";
import { localPort } from "/config.js";
const app = express();


const http = require('http');
const fs = require("fs");
const port = 3000;

const server = http.createServer(function (req, res) {
  res.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("../Frontend/index.html", function (error, data) {
    if (error) {
      res.writehead(404)
      res.write("Error: File not found");
    } else {
      res.write(data);
    }
    res.end();
  });
});

server.listen(port, function (error) {
  if (error) {
    console.log("Something went wrong", error); 
  } else {
    console.log("Server is listening on port " + port);
  }
});



app.use(static(__dirname + "/Frontend"));
app.use(json());
app.use("/jokes", require("/jokes"));

// const port = process.env.PORT || localPort; // Heroku
// app.listen(port);
// console.log("Listening on port " + port + " ...");

app.get("/", async (request, response) => {
  try {
    let jokes = await getJokes();
    response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/jokes", async (request, response) => {
  try {
    let jokes = await getJokes();
    response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/othersites", async (request, response) => {
  try {
    let jokes = await getJokes();
    response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/otherjokes/:site", async (request, response) => {
  try {
    let jokes = await getJokes();
    response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});

app.post("/api/jokes", async (request, response) => {
  try {
    let { name, setup, punchline } = request.body;
    await createJoke(name, setup, punchline);
    response.send({ message: "Joke saved!" });
  } catch (e) {
    sendStatus(e, response);
  }
});

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}
export default app; // test
