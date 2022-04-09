import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
} from "@mantine/core";
import { useColorScheme, useLocalStorage, useHotkeys } from "@mantine/hooks";
import MyAppShell from "./pages/MyAppShell";
import Landing from "./pages/Landing";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: preferredColorScheme,
  });
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }}>
        <Routes>
          <Route path="/" element={<MyAppShell />}>
            <Route path="/" element={<Landing />} />
          </Route>
        </Routes>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};

export default App;
