import mongoose from "mongoose";
import jokes from "../models/jokes.js";
import config from "../config.js";
// import jokesFront from "../public/api/jokes.js";
import router from "../routes/jokes.js";
// import app from "../app.js";

mongoose.connect(
  config.databaseURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB!")
);

export async function createJoke(name, setup, punchline) {
  const jokeSetup = await jokes.findOne().where("setup").equals(setup).exec();
  const jokePunchline = await jokes.findOne().where("punchline").equals(punchline).exec();
  if (!jokeSetup && !jokePunchline) {
    console.log("joke lavet!");
    return await jokes.create({
      name,
      setup,
      punchline,
    });
  }
}

// createJoke(
//   "Patrick - Kongen af far humor",
//   "Hvad kalder man to lamaer, der spiser hestenes hø?",
//   "Ballamaere"
// );

export async function getJokes() {
  return await jokes.find().exec();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.text();
}

async function generateTemplate(hbs, data) {
  let template = await getText("/jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ companies });
}

// async function generateJokes(url) {
//   try {
//     let jokes = await jokesFront.get(url);
//     jokeContainer.innerHTML += await generateTemplate("jokes", jokes);
//   } catch (error) {
//     console.log("An error has occurred on the server");
//   }
// }

// export default controller;
