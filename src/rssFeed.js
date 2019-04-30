const fs = require("fs");
const Feed = require("rss-to-json");

Feed.load(
  "http://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss",
  function GetData(err, rss) {
    // let fileContent = rss;
    // fs.writeFile("./dataFeed.json", JSON.stringify(fileContent), err => {
    //   if (err) {
    //     console.error(err);
    //     return;
    //   }
      // console.log("File has been created");
      console.log(rss);

    // });
  }
);
