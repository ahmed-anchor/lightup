import localFont from "next/font/local";
import "./globals.css";
import NavigationBar from "../components/accessiblity/NavigationBar";

const bigX = localFont({
  src: "./fonts/HEKAYA.otf",
  variable: "--font-bigX",
  weight: "100 900",
});

export const metadata = {
  title: " Light UP - لايت اب",
  description: "لايت اب هي منصه تساعدك علي تنفيذ مشاريع powerpoint, word office, etc.....",
  openGraph: {
    title: "Light UP -  لايت اب",
    description: "لايت اب هي منصه تساعدك علي تنفيذ مشاريع powerpoint, word office, etc.....",
    images: [{url: '/site-assets/lamp.webp'}],
  },
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body
        className={`${bigX.variable} `}
      >
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
