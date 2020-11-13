let Parser = require("rss-parser");
let parser = new Parser();

async function getRss() {
    const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
    const RSS_URL =
        "https://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss";
    try {
        return await parser.parseURL(CORS_PROXY + RSS_URL);
    } catch (error) {
        console.error("Error getting soundcloud rss - falling back on local");
        console.error({ error });
        return await parser.parseURL("./sounds.rss");
    }
}

export default async function parseRss() {
    let songs = [];
    let i = 1;

    let feed = await getRss();

    feed.items.forEach((item) => {
        let duration =
            parseInt(item["itunes"]["duration"].split(":")[1]) * 60 +
            parseInt(item["itunes"]["duration"].split(":")[2]);
        let song = {
            id: i,
            title: item["title"],
            description: item["itunes"]["subtitle"],
            url: item["enclosure"]["url"],
            duration: duration,
            publish_date: item["publish_date"],
        };
        songs.push(song);
        i += 1;
    });

    /////////////////////////////////////////////////////////
    // Custom track sorting

    // split out shrodinger tracks to reorder them separately
    function Shrodinger(title, include) {
        if (title.includes("Schrodinger")) {
            return include;
        } else {
            return !include;
        }
    }

    var nonShrodingers = songs.filter(function (song) {
        return Shrodinger(song.title, false);
    });
    var shrodingers = songs.filter(function (song) {
        return Shrodinger(song.title, true);
    });

    // sort each sub-array
    nonShrodingers.sort(function (song) {
        return song.publish_date;
    });
    shrodingers.sort((a, b) => a.title.localeCompare(b.title));

    //// Simulate latency to test the LoadingIndicator
    // const sleep = (milliseconds) => {
    //   return new Promise(resolve => setTimeout(resolve, milliseconds))
    // }
    // await sleep(2000);

    //re-concatenate and re-assign ids
    var finalList = nonShrodingers.concat(shrodingers);
    i = 1;
    finalList.forEach((song) => {
        song.id = i;
        i++;
    });

    return finalList;
}
