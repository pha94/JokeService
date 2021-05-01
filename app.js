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



export default app;