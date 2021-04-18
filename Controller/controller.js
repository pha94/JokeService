import mongoose from "mongoose";
import jokes from "../BackEnd/jokes.js";
import config from "../BackEnd/config.js";


mongoose.connect(
  config.databaseURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB!")
);

export async function createJoke(name, setup, punchline) {
  return await jokes.create({
    name,
    setup,
    punchline,
  });
}

export function getJokes() {
  return jokes.find().exec();
}
