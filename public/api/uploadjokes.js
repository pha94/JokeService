// import { getJokes, createJoke } from "../../controller/controller.js";
import {Router} from "express";
const router = Router();

// router
  // .get("/api/jokes", async (request, response) => {
  //   try {
  //     response.sendFile("/jokes.html", { root: "../public/api" });
  //   } catch (e) {
  //     sendStatus(e, response);
  //   }
  // })
  // .post("/api/jokes", async (request, response) => {
  //   try {
  //     document
  //       .getElementById("uploadBtn")
  //       .addEventListener("click", async () => {
  //         let name = document.getElementById("name").value;
  //         let setup = document.getElementById("setup").value;
  //         let punchline = document.getElementById("punchline").value;
  //         console.log("button");
  //         if (!name.equals("") && !setup.equals("") && !punchline.equals("")) {
  //           await createJoke(name, setup, punchline);
  //           document.getElementById("name").value = "";
  //           document.getElementById("setup").value = "";
  //           document.getElementById("punchline").value = "";
  //         }
  //       });
  //     response.send({ message: "Joke saved!" });
  //   } catch (e) {
  //     sendStatus(e, response);
  //   }
  // });

async function generateJokes(jokes) {
  let template = await getText("./jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

// async function main() {
//   try {
//     let jokes = await getJokes();
//     document.body.innerHTML = await generateJokes(jokes);
//   } catch (e) {
//     console.log(e.name + ": " + e.message);
//   }
// }
// main();

function sendStatus(e, response) {
  console.error("Exception: " + e);
  if (e.stack) console.error(e.stack);
  response.status(500).send(e);
}

// export default router;
