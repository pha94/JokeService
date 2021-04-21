//* Henter hjemmesiden
async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) {
      throw new Error(respons.status);
    }
    return await respons.json();
  }

async function getJokes(url) {
    try {
      let respons = await get(url);
      console.log(respons);
    } catch (error) {
      console.log(error);
    }
  }
  
  getJokes(jokeUrl);