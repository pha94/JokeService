const jokeContainer = document.getElementById("jokeContainer");
const sitesContainer = document.getElementById("sitesContainer");
const uploadBtn = document.getElementById("uploadBtn");

async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) {
    throw new Error(respons.status);
  }
  return await respons.json();
}

async function post(url, object) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(object),
    headers: { "Content-Type": "application/json" },
  });
  clearFields();
  if (respons.status !== 201) {
    throw new Error(respons.status);
  }
  return await respons.json();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    throw new Error(respons.status);
  return await respons.text();
}

async function generateTemplate(hbs, data) {
  let template = await getText(hbs);
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes: data });
}

async function generateJokes(url) {
  try {
    let jokes = await get(url);
    jokeContainer.innerHTML += await generateTemplate(
      "./templates/jokes.hbs",
      jokes
    );
  } catch (error) {
    console.log(error);
  }
}

async function generateOtherSites(url) {
  try {
    let links = await get(url);
    sitesContainer.innerHTML += await generateTemplate(
      "./templates/othersites.hbs",
      links
    );
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  try {
    await generateJokes("/api/jokes");
    await generateOtherSites("/api/othersites");
  } catch (error) {
    console.log(error.name + ": " + error.message);
  }
}

main();
