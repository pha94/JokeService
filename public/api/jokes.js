//let jokeContainer = document.getElementById("joke-container");
//let uploadBtn = document.getElementById("uploadBtn");

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

  //*Kode til at poste en joke ->

uploadBtn.addEventListener("click", ()=> {
  let name = document.getElementById("name");
  let setup = document.getElementById("setup");
  let punchline = document.getElementById("punchline");
  
  name.innerText = "";
  setup.innerText = "";
  punchline.innerText = "";
  
});

// export default jokesFront;