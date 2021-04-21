import express from "express";
const app = express();
import config from "./config.js"; // MongoDB

app.use(express.static("./public"));
app.use(express.json());
app.use('/jokes', require('./routes/jokes'));
app.use('/otherjokes', require('./routes/otherjokes'));
app.use('/othersites', require('./routes/othersites'));

const port = process.env.PORT || config.localPort; // Heroku
app.listen(port);
console.log("Listening on port " + port + " ...");

app.get("/", async (request, response) => {
  try {
    response.sendFile("/index.html", { root: "./public" });
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
