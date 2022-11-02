import React from "react";

export const DarkModeButton = () => {
    let clickedClass = "clickedClass";

    let theme;
    if (localStorage) {
        theme = localStorage.getItem("theme");
    }

    if (theme === "dark") {
        document.body.classList.add(theme);
    } else {
        document.body.classList.add("light");
    }

    const switchTheme = (e) => {
        const newTheme = theme === "light" ? "dark" : "light";
        document.body.classList.replace(theme, newTheme);
        localStorage.setItem("theme", newTheme);
        theme = newTheme;
    };

    return (
        <button
            id="darkModeButton"
            className={`${theme}Button`}
            onClick={(e) => {
                switchTheme(e);
            }}
        ></button>
    );
};
