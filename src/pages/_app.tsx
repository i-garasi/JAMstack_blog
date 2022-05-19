import "src/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto max-w-prose">
      <header className="border-b border-gray-300 py-6">
        <h1>
          <Link href="/">
            <a className="text-xl font-bold text-cyan-600">i_garasi blog</a>
          </Link>
        </h1>
      </header>
      <main className="mt-6">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
