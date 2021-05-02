const mongoose = require("mongoose");
const jokes = require("../models/jokes");
const config = require("../config");
const fetch = require("node-fetch");

mongoose.connect(
  config.databaseURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB!")
);

exports.createJoke = async function (name, setup, punchline) {
  const jokeSetup = await jokes.findOne().where("setup").equals(setup).exec();
  const jokePunchline = await jokes
    .findOne()
    .where("punchline")
    .equals(punchline)
    .exec();
  if (!jokeSetup && !jokePunchline) {
    console.log("joke lavet!");
    return await jokes.create({
      name,
      setup,
      punchline,
    });
  }
};

exports.getJokes = async function () {
  return jokes.find().exec();
};

exports.get = async function (url) {
  const respons = await fetch(url);
  if (respons.status !== 200) {
    throw new Error(respons.status);
  }
  return await respons.json();
};
