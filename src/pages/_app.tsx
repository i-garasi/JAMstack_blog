import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withGlobalStyles
      withNormalizeCSS
    >
      <div className="mx-auto max-w-5xl">
        <header className="border-b border-gray-300 py-6">
          <h1>
            <Link href="/">
              <a className="text-xl font-bold">i_garasi blog</a>
            </Link>
          </h1>
        </header>
        <main className="mt-6">
          <Component {...pageProps} />
        </main>
      </div>
    </MantineProvider>
  );
}

export default MyApp;
