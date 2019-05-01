const fs = require("fs");
let Parser = require("rss-parser");
let parser = new Parser();

(async () => {
  let feed = await parser.parseURL(
    "http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss"
  );
  // console.log(feed);
  fs.writeFile("./data1.json", JSON.stringify(feed), err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File has been created");
  });
})();
