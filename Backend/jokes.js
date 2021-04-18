import mongoose from "mongoose";

const jokeServiceSchema = new mongoose.Schema({
  name: String,
  setup: String,
  punchline: String,
});


  export default mongoose.model("DBJS", jokeServiceSchema);
  

