const https = require('https');

class Service {
    async makeRequest(url, headers = {}) {
        return new Promise((resolve, reject) => {
            https.get(url, headers, response => {
                response.on("data", data => resolve(JSON.parse(data)));
                response.on("error", reject)
            })
        })
    }   

    async getCharacters(url, headers = {}) {
        const result = await this.makeRequest(url, headers);
        return {
            name: result.docs[0].name,
            race: result.docs[0].race,
            hair: result.docs[0].hair,
            birth: result.docs[0].birth,
            death: result.docs[0].death
        }
    }
}

module.exports = Service