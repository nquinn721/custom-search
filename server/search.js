const fetch = require("node-fetch"),
	  API_KEY = require('./key'),
	  DB = require('./db'),
	  URL = `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=009637816073108880163:nfsysoqnztc&q=`,
	  prefixLink = 'https://www.',
	  suffixLink = '.com/';

	  
module.exports = class Search{

	static async searchMultiple(businesses){
		return await Promise.all(businesses.map(async v => await this.search(v)));
	}
	static async search(business){
		return await this.getBusinesses(URL, business);
	}
	static async getBusinesses(url, business){
		const name = business.name,
			startTime = Date.now(),
			data = await fetch(url + name),
			completeTime = Date.now() - startTime,
			json = await data.json(),
			regx = new RegExp(prefixLink + name + suffixLink),
			domains = json.items.map(v => v.link).map(v => v.match(regx));
		let domain, res;

		if(domains.length && domains[0]){
			domain = domains[0][0];
			DB.csApiStats.storeTime(completeTime);

			res = {name, domain};
		}else{
			res = {error: 'No companies found'};
		}

		return res;

	}
}
