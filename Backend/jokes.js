const mongoose = require("mongoose");

const jokeServiceSchema = new mongoose.Schema({
  name: String,
  setup: String,
  punchline: String,
});

module.exports = mongoose.model("JokeServiceDB.JokeService", jokeServiceSchema);