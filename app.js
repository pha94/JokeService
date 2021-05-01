//import {generateJokes} from "./controller/controller.js";
import config from "./config.js";
import express from "express";
import jokesRouter from "./routes/jokes.js";

const app = express();

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log("Listening on port " + port + " ...");
app.use(express.urlencoded({ extended: true }));
app.use(jokesRouter);


async function main() {
  try {
    // await controller.generateOtherJokes();
    // await controller.generateOtherSites();
    // let jokes = await generateJokes("/api/jokes");
    // console.log("Hello "+ jokes);
  } catch (error) {
    console.log(error.name + ": " + error.message);
  }
}

// main();

export default app;