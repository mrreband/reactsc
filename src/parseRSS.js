let Parser = require("rss-parser");
let parser = new Parser();

async function parseRss() {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const RSS_URL =
    "https://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss";
  var songs = [];
  var i = 1;

  let feed = await parser.parseURL(CORS_PROXY + RSS_URL);
  console.log(feed.title);

  feed.items.forEach(item => {
    var song = {
      id: i,
      title: item["title"],
      description: item["itunes"]["subtitle"],
      url: item["enclosure"]["url"],
      duration: Math.floor(item["enclosure"]["length"] / 40000),
      publish_date: item["publish_date"]
    };
    songs.push(song);
    i += 1;
  });
  return songs;
}

export default function asyncCall() {
  console.log("calling");
  return parseRss();
}

asyncCall().then(result => {
  console.log(result);
});
