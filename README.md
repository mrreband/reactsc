[![Netlify Status](https://api.netlify.com/api/v1/badges/2f44b19a-4cfc-4887-8795-b04a3a01e34f/deploy-status)](https://app.netlify.com/sites/infallible-swirles-271fb6/deploys)

## React website for RSS feeds

Bootstrapped with [Create React App](https://github.com/facebook/create-react-app), then gutted.

---

### **Package Dependencies**

    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-loader-spinner": "^3.1.5",
    "react-promise-tracker": "^2.0.6",
    "react-scripts": "^5.0.1",
    "react-soundplayer": "^1.0.4",
    "rss-parser": "^3.7.2"
    "sass": "^1.49.7"

---

### **Component Structure**

- App.js
    - Header.js
    - Canvas.js
      - LoadingIndicator.js
      - VolumeBar.js
      - Playlist.js
        - Sound.js
          - PlayButton.js
          - ProgressBar.js
          - SoundTimer.js
          - SoundTitle.js
    - Footer.js

---

### **Custom hooks**

- useSound.js
- usePlaylist.js

---

### parse-rss.js

Netlify function to parse an RSS feed -- create and return a list of `Sound` objects

---

## Netlify CLI

### running locally:

```
netlify dev
```

---

### Build:

Creates the `/build` directory with everything needed.  This runs `npm run build` (among other things) under the hood

```
netlify build
```

---

### Deploy:

Use `netlify link` to link your repo to a Netlify site before deploying.

-   #### Deploy Preview

    - by default, a unique id gets generated to use as a prefix to the site location:

      ```
      > netlify deploy

      Logs:              https://app.netlify.com/sites/infallible-swirles-271fb6/deploys/63627f2848363a0f8b64ae61
      Website Draft URL: https://63627f2848363a0f8b64ae61--infallible-swirles-271fb6.netlify.app
      ```

    - use `--alias` to define the prefix:


      ```
      > netlify deploy --alias=test-site

      Logs:              https://app.netlify.com/sites/infallible-swirles-271fb6/deploys/63627e4f61069a0de915bca5
      Website Draft URL: https://test-site--infallible-swirles-271fb6.netlify.app
      ```

      **NOTE**: Netlify uses branch names for aliases in CI - they recommend you don't use them for your own deploys


  - #### Deploy to production:

    ```
    netlify deploy --prod
    ```
