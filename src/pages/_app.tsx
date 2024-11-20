import "@styles/globals.css";
import type { AppProps } from "next/app";

import { League_Spartan } from 'next/font/google';

// Configure the font
const leagueSpartan = League_Spartan({
  weight: '300',
  subsets: ['latin'],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={leagueSpartan.className}>
      <Component {...pageProps} />
    </main>
  );
}