import controller from "./controller/controller.js";

let jokeContainer = document.getElementById("joke-container");

export async function get(url) {
  const respons = await fetch(url);
  if (respons.status !== 200) throw new Error(respons.status);
  return await respons.json();
}

export async function post(url, objekt) {
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

async function generateJokes(url) {
    try {
      let jokes = await get(url);
    jokeContainer.innerHTML += await generateTemplate("jokes", jokes);
    } catch (error) {
      console.log("An error has occurred on the server");
    }
}

async function main() {
  try {
    await generateJokes("./models/jokes");
    // await generateOtherJokes();
    // await generateOtherSites();
  } catch (error) {
    console.log(error.name + ": " + e.message);
  }
}

main();

export default main; // test
