const fetch = require("node-fetch");

export default async function parseRss() {
    try {
        const response = await fetch(
            "http://localhost:8888/.netlify/functions/parse-rss",
            {
                headers: { Accept: "application/json" },
            }
        );
        if (!response.ok) {
            // NOT res.status >= 200 && res.status < 300
            return { statusCode: response.status, body: response.statusText };
        }
        const data = await response.json();
        console.log({data})
        return data;
    } catch (error) {
        // output to netlify function log
        console.log(error);
        return {
            statusCode: 500,
            // Could be a custom message or object i.e. JSON.stringify(err)
            body: JSON.stringify({ msg: error.message }),
        };
    }
}
