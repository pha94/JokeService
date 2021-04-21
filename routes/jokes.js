import {getJokes, createJoke} from "../controller/controller.js";
import express from "express";
const router = express.Router();

router.get("/api/jokes", async (request, response) => {
  try {
    response.sendFile("/jokes.html", { root: "../jokeservice/public/api" });
    let jokes = await getJokes();
    response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});

router.post("/api/jokes", async (request, response) => {
  try {
    let { name, setup, punchline } = request.body;
    await createJoke(name, setup, punchline);
    response.send({ message: "Joke saved!" });
  } catch (e) {
    sendStatus(e, response);
  }
});

async function getAllJokes(jokes) {
  let template = await getText("./jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

export default router;
