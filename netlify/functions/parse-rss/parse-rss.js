const Parser = require("rss-parser");

async function getRssFeed() {
    const parser = new Parser();
    const RSS_URL =
        "https://feeds.soundcloud.com/users/soundcloud:users:31432799/sounds.rss";
    try {
        return await parser.parseURL(RSS_URL);
    } catch (error) {
        console.error("Error getting soundcloud rss - falling back on local");
        console.error({ error });
        return await parser.parseURL("./sounds.rss");
    }
}

async function parseFeed(feed) {
    let songs = [];
    let i = 1;

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

    //re-concatenate and re-assign ids
    var finalList = nonShrodingers.concat(shrodingers);
    i = 1;
    finalList.forEach((song) => {
        song.id = i;
        i++;
    });

    return finalList;
}

const handler = async function () {
    try {
        const rssFeed = await getRssFeed();
        const trackList = await parseFeed(rssFeed);

        return {
            statusCode: 200,
            body: JSON.stringify(trackList),
        };
    } catch (error) {
        // output to netlify function log
        console.log(error);
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        };
    }
};

module.exports = { handler };
