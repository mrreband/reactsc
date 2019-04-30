let Parser = require('rss-parser');
let parser = new Parser();

(async () => {
	var songs = [];
	let feed = await parser.parseURL('http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss');
	console.log(feed.title);

	feed.items.forEach((item) => {
		console.log(item);
		songs =
			songs +
			{
				title: item.title,
				url: item.link
			};
    });
	return songs;
})();
