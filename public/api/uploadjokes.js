import controller from '../controller/controller.js';

document.getElementById("uploadBtn").addEventListener("click", async () => {
  let name = document.getElementById("name").value;
  let setup = document.getElementById("setup").value;
  let punchline = document.getElementById("punchline").value;
  console.log("button");
  if (!name.equals("") && !setup.equals("") && !punchline.equals("")) {
    await controller.createJoke(name, setup, punchline);
    document.getElementById("name").value = "";
    document.getElementById("setup").value = "";
    document.getElementById("punchline").value = "";
  }
});

async function generateJokes(jokes) {
  let template = await getText("./jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function main() {
  try {
    let jokes = await getJokes();
    document.body.innerHTML = await generateJokes(jokes);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}
main();
