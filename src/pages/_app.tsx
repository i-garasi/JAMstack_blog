import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import {
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Box,
} from "@mantine/core";
import { useState } from "react";
import ToggleColorSchemeButton from "src/commons/ToggleColorSchemeButton";

function MyApp({ Component, pageProps }: AppProps) {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("dark");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme: colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <Box className="mx-auto max-w-5xl">
          <header className="border-b border-gray-300 py-6">
            <Box className="flex items-center justify-between ">
              <h1>
                <Link href="/">
                  <a className="text-xl font-bold">i_garasi blog</a>
                </Link>
              </h1>
              <Box>
                <ToggleColorSchemeButton />
              </Box>
            </Box>
          </header>
          <main className="mt-6">
            <Component {...pageProps} />
          </main>
        </Box>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default MyApp;
