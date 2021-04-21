const jokesUrl = "/api/jokes";

//* Henter hjemmesiden
async function get(url) {
  const respons = await fetch(url);
  console.log(respons);
  if (respons.status !== 200) {
    throw new Error(respons.status);
  }
  return await respons.json();
}

async function generateJokes(jokes) {
  let template = await getText("./api/jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function getJokes(url) {
  try {
    let respons = await get(url);
    document.getElementById("joke-container").innerHTML += await generateJokes(
      respons
    );
    console.log(respons);
  } catch (error) {
    console.log(error);
  }
}
getJokes(jokesUrl);
