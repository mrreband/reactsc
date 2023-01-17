import React from "react";
import "../../themes.css";

const DarkModeButton = () => {
    const body = document.body;
    const lightTheme = "lightmode";
    const darkTheme = "darkmode";
    let theme;

    if (localStorage) {
        theme = localStorage.getItem("theme");
        if (!theme) theme = "lightmode";
    }

    if (theme === lightTheme || theme === darkTheme) {
        body.classList.add(theme);
    } else {
        body.classList.add(lightTheme);
    }

    const switchTheme = (e) => {
        const newTheme = theme === lightTheme ? darkTheme : lightTheme;
        body.classList.replace(theme, newTheme);
        theme = newTheme;
    };

    return (
        <button
            className={theme}
            id="darkModeButton"
            onClick={(e) => switchTheme(e)}
        ></button>
    );
};

export default DarkModeButton;
