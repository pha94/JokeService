import express from "express";
import {createJoke} from "../controller/controller.js";
const router = express.Router();

router.use(express.static("./public"));
router.use(express.json());


router.get("/api/jokes", async (request, response) => {
    try {
      response.sendFile("/jokes.html", { root: "../JokeService/public" });
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
      const joke = await createJoke(name, setup, punchline);
  
      if (joke !== undefined) {
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

// router.get("/api/othersites", async (request, response) => {
//   try {
//     response.sendFile("/othersites.html", {
//       root: "../jokeservice/public",
//     });
//   } catch (e) {
//     sendStatus(e, response);
//   }
// });
// router.get("/api/otherjokes/:site", async (request, response) => {
//   try {
//     response.sendFile("/otherjokes.html", {
//       root: "../jokeservice/public",
//     });
//   } catch (e) {
//     sendStatus(e, response);
//   }
// });


function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

export default router;