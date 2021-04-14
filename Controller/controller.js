const mongoose = require("mongoose");
const Jokes = require("../BackEnd/jokes");
const config = require("../BackEnd/config");

mongoose.connect(config.databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createJoke = function (name, setup, punchline) {
  return Jokes.create({
    name,
    setup,
    punchline
  });
};

exports.getJokes = function () {
  return Jokes.find().exec();
};
