// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { BookingProvider } from "@/context/BookingContext";

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <BookingProvider>
        <Component {...pageProps} />
      </BookingProvider>
    </div>
  );
}
