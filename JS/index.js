const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const jokes = mongoose.model("JokeServiceDB.JokeService", jokeServiceSchema);

mongoose.connect("mongodb://localhost:27017/JokeServiceDB.JokeService", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`);
});

async function createJoke(name, setup, punchline) {
  return await jokes.create({ name, setup, punchline });
}

let joke = {
  name: "",
  setup: "",
  punchline: "",
};

Joke.create = (name, setup, punchline) => {
  Joke.name = name;
  Joke.setup = setup;
  Joke.punchline = punchline;
};

const jokeServiceSchema = new mongoose.Schema({
  name: String,
  setup: String,
  punchline: String,
});

document.getElementById("uploadBtn").