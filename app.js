import { createJoke } from "./Controller/controller.js";
import express from "express";
import config from "./config.js"; // MongoDB
const app = express();

app.use(express.static("./public"));
app.use(express.json());

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log("Listening on port " + port + " ...");

app.get("/", async (request, response) => {
  try {
    response.sendFile("/index.html", { root: "./public/api" });
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/jokes", async (request, response) => {
  try {
    response.sendFile("/jokes.html", { root: "./public/api" });
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/othersites", async (request, response) => {
  try {
    response.sendFile("/othersites.html", { root: "./public/api" });
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/otherjokes/:site", async (request, response) => {
  try {
    response.sendFile("/otherjokes.html", { root: "./public/api" });
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
