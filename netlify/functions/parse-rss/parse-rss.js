const Parser = require("rss-parser");

async function getRss() {
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

const handler = async function () {
  try {
    const data = await getRss()

    return {
      statusCode: 200,
      body: JSON.stringify( data ),
    }
  } catch (error) {
    // output to netlify function log
    console.log(error)
    return {
      statusCode: 500,
      // Could be a custom message or object i.e. JSON.stringify(err)
      body: JSON.stringify({ msg: error.message }),
    }
  }
}

module.exports = { handler }
