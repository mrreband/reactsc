## React website for RSS feeds

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app), then gutted.

---

### **Package Dependencies**

    "node-sass": "^4.13.1",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-loader-spinner": "^3.1.5",
    "react-promise-tracker": "^2.0.6",
    "react-scripts": "^3.3.0",
    "react-soundplayer": "^1.0.4",
    "rss-parser": "^3.7.2"

---

### **Component Structure**

- App.js
    - Header.js
    - SoundList.js
        - LoadingIndicator.js
        - Sound.js
            - PlayButton.js
            - ProgressBar.js
            - SoundTimer.js
            - SoundTitle.js
    - Footer.js

---

### parseRSS.js

Parse an RSS feed to create and return a list of `Sound` objects

