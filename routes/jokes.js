import { getJokes, createJoke } from "../controller/controller.js";
import express from "express";
const router = express.Router();

router
  .get("/api/jokes", async (request, response) => {
    try {
      response.sendFile("/jokes.html", { root: "../public/api" });
      let jokes = getJokes();
      // getAllJokes(jokes);
    } catch (e) {
      sendStatus(e, response);
    }
  })
  .post("/api/jokes", async (request, response) => {
    try {
      document
        .getElementById("uploadBtn")
        .addEventListener("click", async () => {
          let name = document.getElementById("name").value;
          let setup = document.getElementById("setup").value;
          let punchline = document.getElementById("punchline").value;
          console.log("button");
          if (!name.equals("") && !setup.equals("") && !punchline.equals("")) {
            await createJoke(name, setup, punchline);
            document.getElementById("name").value = "";
            document.getElementById("setup").value = "";
            document.getElementById("punchline").value = "";
          }
        });
      response.send({ message: "Joke saved!" });
      // getAllJokes();
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
