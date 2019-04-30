let Parser = require('rss-parser');
let parser = new Parser();

async function getSongs () {
	let feed = await parser.parseURL('http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss');
	return feed.items;
};

getSongs().then(function(value) {
    value.forEach((item) => {
        console.log(item);
    });
});
