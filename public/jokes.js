const jokeContainer = document.getElementById("jokeContainer");
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
    // Created
    throw new Error(respons.status);
  }
  return await respons.json();
}

async function getText(url) {
  const respons = await fetch(url);
  if (respons.status !== 200)
    // OK
    throw new Error(respons.status);
  return await respons.text();
}

async function generateJokesTemplate(jokes) {
  let template = await getText("./templates/jokes.hbs");
  let compiledTemplate = Handlebars.compile(template);
  return compiledTemplate({ jokes });
}

async function generateJokes(url) {
  try {
    let jokes = await get(url);
    jokeContainer.innerHTML += await generateJokesTemplate(jokes);
  } catch (error) {
    console.log(error);
  }
}

// async function postJoke(url) {
//   try {
//     const joke = await post(url, createJoke);
//     jokeContainer.innerHTML += await generateJokesTemplate(jokes);
//   } catch (error) {
//     console.log();
//   }
// }

// exports.module = function clearFields() {
//   document.getElementById("name").innerHTML = "";
//   document.getElementById("setup").innerHTML= "";
//   document.getElementById("punchline").innerHTML = "";
// }

async function main() {
  try {
    // await generateOtherJokes("/api/");
    // await generateOtherSites("/api");
    // console.log("main metode");
    await generateJokes("/api/jokes");
    // let jokes = await get("/jokes");
    // jokeContainer.innerHTML += await generateJokes();
  } catch (error) {
    console.log(error.name + ": " + error.message);
  }
}

main();
