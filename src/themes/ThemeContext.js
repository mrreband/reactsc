import { createContext, useReducer } from "react";
import { themes } from "./themes.json";

export const ThemeContext = createContext();

const initialState = { darkMode: false };

const themeReducer = (state, action) => {
    switch (action.type) {
        case "LIGHTMODE":
            return {
                darkMode: false,
                colors: themes.light,
            };
        case "DARKMODE":
            return {
                darkMode: true,
                colors: themes.dark,
            };
        default:
            return state;
    }
};

export function ThemeProvider(props) {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return (
        <ThemeContext.Provider value={{ state: state, dispatch: dispatch }}>
            {props.children}
        </ThemeContext.Provider>
    );
}

export default ThemeContext;
