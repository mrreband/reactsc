const fs = require("fs");
let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  var songs = [];

  let feed = await parser.parseURL(
    "https://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss"
  );

  var i = 1;
  feed.items.forEach(function(item) {
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

  /////////////////////////////////////////////////////////
  // split out shrodinger tracks to reorder them separately
  function Shrodinger(title, include) {
    if (title.includes("Schrodinger")) {
      return include;
    } else {
      return !include;
    }
  }

  var nonShrodingers = songs.filter(function(song) {
    return Shrodinger(song.title, false);
  });
  var shrodingers = songs.filter(function(song) {
    return Shrodinger(song.title, true);
  });

  // sort each sub-array
  nonShrodingers.sort(function(song) {
    return song.publish_date;
  });

  shrodingers.sort((a, b) => a.title.localeCompare(b.title));

  //re-concatenate
  songs = nonShrodingers.concat(shrodingers);

  /////////////////////////////////////////////////////////
  // write to file
  fs.writeFile("./data.json", JSON.stringify(songs), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
})();
