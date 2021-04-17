import { Schema, model } from "mongoose";

const jokeServiceSchema = new Schema({
  name: String,
  setup: String,
  punchline: String,
});

export default model("JokeServiceDB.JokeService", jokeServiceSchema);



