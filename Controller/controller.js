const mongoose = require("mongoose");
const jokes = require("../BackEnd/jokes");
const config = require("../BackEnd/config");

mongoose.connect(config.databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

exports.createJoke = function (name, setup, punchline) {
  return await jokes.create({
    name,
    setup,
    punchline
  });
};

exports.getJokes = function () {
  return jokes.find().exec();
};
