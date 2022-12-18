import { createContext, useCallback, useEffect, useState } from "react";
import { allThemes } from "shared/constants/themes";
import { ColorScheme, Theme } from "types";
import { itemStorage } from "utils/storageHelpers";

interface ThemeContextData {
    theme: Theme;
    isDarkTheme: boolean;
    setTheme: (theme: Theme) => void;
}

type ThemeProviderProps = {
    defaultTheme: Theme;
    children: React.ReactNode;
};

const themeStore = itemStorage<Theme>("theme", "localStorage");

export const ThemeContext = createContext<ThemeContextData>({
    theme: "system",
    isDarkTheme: false,
    setTheme: () => { },
});

const getInitialTheme = (defaultTheme: Theme): Theme => {
    const storedTheme = themeStore.get();
    if (storedTheme && allThemes.includes(storedTheme)) {
        return storedTheme;
    }
    return defaultTheme;
};

export const ThemeProvider = ({ defaultTheme, children }: ThemeProviderProps) => {
    const [theme, setTheme] = useState(getInitialTheme(defaultTheme));
    const [scheme, setScheme] = useState<ColorScheme>();

    const setColorTheme = (theme: Theme) => {
        setTheme(theme);
        themeStore.set(theme);
    };

    const setColorScheme = useCallback((scheme: ColorScheme) => {
        setScheme(scheme);
        if (scheme === "dark") {
            document.documentElement.classList.add('dark');
        }
        else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        // Set the color scheme based on the theme
        const checkTheme = () => {
            if (theme === "system") {
                setColorScheme(mediaQuery.matches ? "dark" : "light");
            }
            else {
                setColorScheme(theme);
            }
        }
        checkTheme();

        // Watch for changes in the system theme
        const listener = () => {
            checkTheme();
        };
        mediaQuery.addEventListener("change", listener);
        return () => {
            mediaQuery.removeEventListener("change", listener);
        };
    }, [theme, setColorScheme]);

    return (
        <ThemeContext.Provider value={{
            theme: theme,
            isDarkTheme: scheme === "dark",
            setTheme: setColorTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};