const mongoose = require("mongoose");
const jokes = require("../BackEnd/jokes");
const config = require("../BackEnd/config");

mongoose.connect(config.databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export function createJoke (name, setup, punchline) {
  return await jokes.create({
    name,
    setup,
    punchline
  });
};

export function getJokes() {
  return jokes.find().exec();
};
