let Parser = require("rss-parser");
let parser = new Parser();

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export default async function parseRss() {
  const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
  const RSS_URL =
    "https://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss";
  let songs = [];
  let i = 1;

  let feed = await parser.parseURL(CORS_PROXY + RSS_URL);

  feed.items.forEach(item => {
    let duration =
      parseInt(item["itunes"]["duration"].split(":")[1]) * 60 +
      parseInt(item["itunes"]["duration"].split(":")[2]);
    let song = {
      id: i,
      title: item["title"],
      description: item["itunes"]["subtitle"],
      url: item["enclosure"]["url"],
      duration: duration,
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

  await sleep(2000);
  shrodingers.sort((a, b) => a.title.localeCompare(b.title));

  //re-concatenate
  var finalList = nonShrodingers.concat(shrodingers);
  return finalList;  
}

// parseRss().then(result => {
//   console.log(result);
// });
