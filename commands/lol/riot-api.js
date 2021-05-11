const axios = require("axios");

class RiotAPI {
  constructor(key) {
    if (typeof key !== "string") {
      throw new Error("Bad API key");
    }

    if (key.length === 0) {
      throw new Error("Bad API key");
    }

    this.apiKey = key;
  }

  get api_key() {
    return this.apiKey;
  }

  set api_key(key) {
    if (key) {
      this.apiKey = key;
    }
  }

  getLostStatus() {
    return this.makeApiCall("getLolStatus");
  }

  getSummonerBySummonerId(id) {
    return this.makeApiCall("getSummonerBySummonerId", id);
  }

  getSummonerByName(name) {
    return this.makeApiCall("getSummonerByName", name);
  }

  getSummonerByAccountId(accountId) {
    return this.makeApiCall("getSummonerByAccountId", accountId);
  }

  getSummonerByPuuid(puuid) {
    return this.makeApiCall("getSummonerByPuuid", puuid);
  }

  getMatchesByAccountId(accountId) {
    return this.makeApiCall("getMatchesByAccountId", accountId);
  }

  getMatchById(id) {
    return this.makeApiCall("getMatchById", id);
  }

  urlFor(api, resource) {
    const urlMap = {
      getLolStatus: "https://euw1.api.riotgames.com/lol/status/v3/shard-data",
      getSummonerBySummonerId: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/${resource}`,
      getSummonerByName: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${resource}`,
      getSummonerByAccountId: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-account/${resource}`,
      getMatchesByAccountId: `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${resource}`,
      getMatchById: `https://euw1.api.riotgames.com/lol/match/v4/matches/${resource}`,
    };

    if (!urlMap.hasOwnProperty(api)) {
      throw new Error(`Unrecognized API: ${api}`);
    }

    return urlMap[api];
  }

  makeApiCall(api, resource) {
    const req = axios.create({
      headers: { "X-Riot-Token": this.apiKey },
      responseType: "json",
    });
    const url = this.urlFor(api, resource);

    return req
      .get(url)
      .then((res) => res)
      .catch((err) => err.response);
  }
}

module.exports =  RiotAPI;
