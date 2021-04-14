document.getElementById("uploadBtn").addEventListener("click", async () => {
  let name = document.getElementById("name").value;
  let setup = document.getElementById("setup").value;
  let punchline = document.getElementById("punchline").value;

  await createJoke(name, setup, punchline);
  console.log("button");
  if (!name.equals("") && !setup.equals("") && !punchline.equals("")) {
    jokes.create(name, setup, punchline);
  }
});

async function generateUserTable(jokes) {
  let template = await getText("/index.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function main() {
  try {
    let jokes = await jokes.find().all().exec();
    document.body.innerHTML = await generateUserTable(jokes);
  } catch (e) {
    console.log(e.name + ": " + e.message);
  }
}
main();
