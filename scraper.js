const cheerio = require('cheerio');
const tp = require('cheerio-tableparser');
const axios = require("axios");
const fs = require('fs');

const getPremierLeague = async () => {
	const url = "https://www.scorebing.com/league/35";
	
	const html = await axios.get(url, {headers: {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
});	
	fs.writeFile('hello.html', html.data, function(err) {
		if(err) return console.log(err);
		console.log('prova');
	});
	const selector = cheerio.load(html.data);
	tp(selector);
		
	const label = selector("#next > table");
	fs.writeFile('hello.txt', label, function(err) {
		if(err) return console.log(err);
		console.log('prova');
	});
	let t = label.parsetable();
	t = t.slice(0,5);
	console.log(t[0][0]);

	for(let i = 0; i < t.length; i++){
	 for(let j = 0; j < t[i].length; j++){
		t[i][j] = t[i][j].replace(/<\/?[^>]+(>|$)/g, "").replace('\\n','').replace(/\s/g, "");
		}
	}

	return t
}
module.exports = {
	getPremierLeague
}
