 import { getJokes, createJoke } from "./controller/controller.js";
import express from "express";
const app = express();

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log("Listening on port " + port + " ...");

app.use(express.static("./public"));
app.use(express.json());
app.use(jokes);


app.get("/api/jokes", async (request, response) => {
  try {
    response.sendFile("/index.html", { root: "../jokeservice/public/HTML" });
    let jokes = await getJokes();
    response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});
app.post("/api/jokes", async (request, response) => {
  try {
    console.log("Vi er i posten nu!");
    let name = request.body.name;
    let setup = request.body.setup;
    let punchline = request.body.punchline;
    const joke = await createJoke(name, setup, punchline);
    
    if (joke) {
      response.send({ message: "Joke saved!" });
    } else if (!joke) {
      response.send({
        message: "Joke ikke oprettet, da den findes allerede",
      });
    }
  } catch (e) {
    sendStatus(e, response);
  }
});
app.get("/api/othersites", async (request, response) => {
  try {
    response.sendFile("/othersites.html", {
      root: "../jokeservice/public/HTML",
    });
  } catch (e) {
    sendStatus(e, response);
  }
});
app.get("/api/otherjokes/:site", async (request, response) => {
  try {
    response.sendFile("/otherjokes.html", {
      root: "../jokeservice/public/HTML",
    });
  } catch (e) {
    sendStatus(e, response);
  }
});

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

export default app;
