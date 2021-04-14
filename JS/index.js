const mongooseDB = require("mongoose");
const express = require("express");
const app = express();
const PORT = 3000;
const jokes = mongooseDB.model("JokeServiceDB.JokeService", jokeServiceSchema);

mongooseDB.connect("mongodb://localhost:27017/JokeServiceDB.JokeService", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

console.log("hej");

mongooseDB.connection.on("error", (err) => {
  console.log("err", err);
});

mongooseDB.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`);
});

async function createJoke(name, setup, punchline) {
  return await jokes.create({ name, setup, punchline });
}

Joke.create = (name, setup, punchline) => {
  Joke.name = name;
  Joke.setup = setup;
  Joke.punchline = punchline;
};

const jokeServiceSchema = new mongooseDB.Schema({
  name: String,
  setup: String,
  punchline: String,
});

document.getElementById("uploadBtn").addEventListener("click", () => {
  let name = document.getElementById("name").value;
  let setup = document.getElementById("setup").value;
  let punchline = document.getElementById("punchline").value;
  console.log("button");
  if (!name.equals("") && !setup.equals("") && !punchline.equals("")) {
    jokes.create(name, setup, punchline);
  }
});

async function generateUserTable(jokes) {
  let template = await getText("/index.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function main() {
  try {
    let jokes = await jokes.find().all();
    document.body.innerHTML = await generateUserTable(jokes);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}
main();
