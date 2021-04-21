const jokeUrl = "/api/jokes";
const uploadBtn = document.getElementById("uploadBtn");

//* Post til server
async function post(url, object) {
  const respons = await fetch(url, {
    method: "POST",
    body: JSON.stringify(object),
    headers: { "Conent-type": "application/json" },
  });
  if (respons.status !== 201) {
    throw new Error(respons.status);
  }
  return await respons.json();
}

//* Objektet der skal postes
let joke = {
  name: document.getElementById("name"),
  setup: document.getElementById("setup"),
  punchline: document.getElementById("punchline"),
};

//* Post til hjemmesiden
async function postJoke(url) {
  try {
    let respons = await post(url, joke);
    console.log(respons);
  } catch (error) {
    console.log(error);
  }
}

uploadBtn.addEventListener("click", async () => {
  let name = document.getElementById("name").value;
  let setup = document.getElementById("setup").value;
  let punchline = document.getElementById("punchline").value;
  if (name !== "" && setup !== "" && punchline !== "") {
    await postJoke(jokeUrl);
    document.getElementById("name").value = "";
    document.getElementById("setup").value = "";
    document.getElementById("punchline").value = "";
  }
  console.log("Joke saved XD");
});
