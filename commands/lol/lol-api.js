const axios = require("axios");
require("dotenv").config();

var config = {
  headers: {
    "X-Riot-Token": process.env.RIOT_API_KEY,
  },
};

async function getId(name) {
  let url =
    "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" +
    encodeURIComponent(name);
  let dados = [];
  let err = false;
  let response = await axios.get(url, config).catch(function (error) {
    if (error) {
      err = true;
    }
  });

  if (err) {
    console.log(`Erreur : joueur ${name} non existent`);
    return dados;
  } else {
    dados.push(
      response.data.accountId,
      response.data.profileIconId,
      response.data.revisionDate,
      response.data.name,
      response.data.id,
      response.data.puuid,
      response.data.summonerLevel
    );
    return dados;
  }
}

module.exports = {
  name: "lolApi",
  getId
};
