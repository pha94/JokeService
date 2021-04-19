import { getJokes, createJoke } from "./controller/controller.js";
import express from "express";
import config from "./backend/config.js"; // MongoDB
const app = express();

app.use(express.static("/frontend"));
app.use(express.json());

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log("Listening on port " + port + " ...");

app.get("/", async (request, response) => {
  try {
    response.sendFile("/index.html", { root: "./frontend" });
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/jokes", async (request, response) => {
  try {
    response.sendFile("/jokes.html", { root: "./frontend/api" });
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/othersites", async (request, response) => {
  try {
    response.sendFile("/othersites.html", { root: "./frontend/api" });
  } catch (e) {
    sendStatus(e, response);
  }
});

app.get("/api/otherjokes/:site", async (request, response) => {
  try {
    response.sendFile("/otherjokes.html", { root: "./frontend/api" });
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
