//import { createJoke, getJokes } from "Controller";
//const controller = require("./Controller/cotroller");
let controller = await import("./Controller/cotroller");
console.log(module.keyValue);

document.getElementById("uploadBtn").addEventListener("click", async () => {
  let name = document.getElementById("name").value;
  let setup = document.getElementById("setup").value;
  let punchline = document.getElementById("punchline").value;
  await createJoke(name, setup, punchline);
  console.log("button");
  if (!name.equals("") && !setup.equals("") && !punchline.equals("")) {
    jokes.create(name, setup, punchline);
    document.getElementById("name").value = "";
    document.getElementById("setup").value = "";
    document.getElementById("punchline").value = "";
  }
});

async function generateUserTable(jokes) {
  let template = await getText("/index.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function main() {
  try {
    let jokes = await controller.getJokes();
    document.body.innerHTML = await generateUserTable(jokes);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}
main();
