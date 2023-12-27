const Parser = require("rss-parser");
const playlists = require("./playlists.json")

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

function getSlug(url) {
    let slug = url.split("/").pop()
    slug = slug.split(".")[0]
    slug = slug.replace("reband", "")
    slug = slug.split("--")[1]
    return slug
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
            imageUrl: item["itunes"]["image"],
            url: item["enclosure"]["url"],
            duration: duration,
            publish_date: item["isoDate"],
        };
        song.slug = getSlug(song.url);
        songs.push(song);
        i += 1;
    });

    /////////////////////////////////////////////////////////
    // Custom track sorting
    for (const playlist of playlists) {
        const trackSlugs = playlist.slugs;

        // get the tracks for this playlist
        const playlistSongs = []
        for (const slug of trackSlugs) {
            const playlistSong = songs.find(s => {return s.slug === slug})
            if (playlistSong !== undefined) {
                if (playlistSong.playlists === undefined) { playlistSong.playlists = [] }
                playlistSong.playlists.push(playlist.name)
                playlistSongs.push(playlistSong)
            }
        }

        // strip from the full list
        songs = songs.filter(s => {
            return !(trackSlugs.includes(s.slug));
        })

        // add to the top or bottom, or insert all where the first or last track was released
        if (playlist.position === "top"){
            songs = [...playlistSongs, ...songs]
        } else if (playlist.position === "bottom") {
            songs = [...songs, ...playlistSongs]
        } else if (playlist.position === "first") {
            const maxPlaylistId = Math.max(...playlistSongs.map(s => s.id))
            const first = songs.slice(0, maxPlaylistId - 1)
            const last = songs.slice(maxPlaylistId - 1)
            songs = [...first, ...playlistSongs, ...last]
        } else {
            // last
            const minPlaylistId = Math.min(...playlistSongs.map(s => s.id))
            const first = songs.slice(0, minPlaylistId - 1)
            const last = songs.slice(minPlaylistId - 1)
            songs = [...first, ...playlistSongs, ...last]
        }
    }

    //re-concatenate and re-assign ids
    i = 1;
    songs.forEach((song) => {
        song.id = i;
        i++;
    });

    return songs;
}

const handler = async function () {
    try {
        const rssFeed = await getRssFeed();
        const trackList = await parseFeed(rssFeed);

        return {
            statusCode: 200,
            body: JSON.stringify({ tracks: trackList }),
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
