[![Netlify Status](https://api.netlify.com/api/v1/badges/2f44b19a-4cfc-4887-8795-b04a3a01e34f/deploy-status)](https://app.netlify.com/sites/infallible-swirles-271fb6/deploys)

## React SPA website for RSS feeds

Built for a SoundCloud artist feed [mr.reband.io]

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app), then gutted.

---

### **Package Dependencies**

    "node-sass": "^4.13.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-loader-spinner": "^3.1.5",
    "react-promise-tracker": "^2.0.6",
    "react-scripts": "^3.3.0",
    "rss-parser": "^3.7.2"

---

### **Component Structure**

-   App.js
    -   Header.js
    -   SoundList.js `(<audio>)`
        -   LoadingIndicator.js
        -   Sound.js `(<source>)`
            -   PlayButton.js
            -   ProgressBar.js
            -   SoundTimer.js
            -   SoundTitle.js
    -   Footer.js

---

### parseRSS.js

Parse an RSS feed to create and return a list of `Sound` objects
