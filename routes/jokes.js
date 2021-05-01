import { getJokes, createJoke } from "../controller/controller.js";
import express from "express";
const router = express.Router();

router.get("/api/jokes", async (request, response) => {
  try {
    response.sendFile("/jokes.html", { root: "../jokeservice/public" });
    let jokes = await getJokes();
    //response.send(jokes);
  } catch (e) {
    sendStatus(e, response);
  }
});
router.post("/api/jokes", async (request, response) => {
  try {
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
router.get("/api/othersites", async (request, response) => {
  try {
    response.sendFile("/othersites.html", {
      root: "../jokeservice/public",
    });
  } catch (e) {
    sendStatus(e, response);
  }
});
router.get("/api/otherjokes/:site", async (request, response) => {
  try {
    response.sendFile("/otherjokes.html", {
      root: "../jokeservice/public",
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

export default router;
