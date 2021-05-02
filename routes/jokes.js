const express = require("express");
const controller = require("../controller/controller");
const router = express.Router();

const jokeSitesUrl = "https://krdo-joke-registry.herokuapp.com/api/services";

router
  .get("/api/jokes", async (request, response) => {
    try {
      let jokes = await controller.getJokes();
      response.send(jokes);
    } catch (e) {
      sendStatus(e, response);
    }
  })
  .post("/api/jokes", async (request, response) => {
    try {
      console.log("Vi er i posten nu!");
      let name = request.body.name;
      let setup = request.body.setup;
      let punchline = request.body.punchline;
      const joke = await controller.createJoke(name, setup, punchline);
      if (joke !== undefined) {
        response.redirect("/");
      } else {
      }
    } catch (e) {
      sendStatus(e, response);
    }
  })
  .get("/api/othersites", async (request, response) => {
    try {
      let link = await controller.get(jokeSitesUrl);
      response.send(link);
    } catch (e) {
      sendStatus(e, response);
    }
  })
  .get("/api/otherjokes/:site", async (request, response) => {
    try {
      let site = request.params.site;
      let links = await controller.get("https://" + site + "/api/jokes");
      response.send(links);
    } catch (e) {
      sendStatus(e, response);
    }
  });

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

module.exports = router;
