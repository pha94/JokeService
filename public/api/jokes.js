const jokeContainer = document.getElementById("joke-container");
// let uploadBtn = document.getElementById("uploadBtn");

async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) throw new Error(respons.status);
  return await respons.json();
}

async function post(url, objekt) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(objekt),
    headers: { "Content-Type": "application/json" },
  });
  if (respons.status !== 201)
    // Created
    throw new Error(respons.status);
  return await respons.json();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.text();
}

// async function generateTemplate() {
//   let template = await getText("./jokes.hbs");
//   let compiledTemplate = Handlebars.compile(template);
//   return compiledTemplate({ jokes });
// }

async function generateJokes() {
  let jokes = await get("/api/jokes");
  let template = await getText("../jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function main() {
  try {
    // await generateOtherJokes();
    // await generateOtherSites();
    jokeContainer.innerHTML += await generateJokes();
  } catch (error) {
    console.log(error.name + ": " + error.message);
  }
}

main();
