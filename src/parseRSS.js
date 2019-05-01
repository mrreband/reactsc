const fs = require("fs");
let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  var songs = [];
  
  let feed = await parser.parseURL(
    "http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss"
  );

  feed.items.forEach(function(item) {
    var song = {
      title: item["title"],
      description: item["itunes"]["subtitle"],
      url: item["enclosure"]["url"]
    };
    console.log(song);
    songs.push(song);
  });

  fs.writeFile("./data.json", JSON.stringify(songs), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
})();
