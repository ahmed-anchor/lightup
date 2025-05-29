import localFont from "next/font/local";
import "./globals.css";
import { BackgroundGrid, GhostIcon } from "@/components/Statics";


const bigX = localFont({
  src: "./fonts/local-font.otf",
  variable: "--font-bigX",
  weight: "100 900",
});

const robert = localFont({
  src: "./fonts/robert.otf",
  variable: "--font-robert",
  weight: "100 900",
});

export const metadata = {
  title: " Light UP - لايت اب",
  description: "لايت اب هي منصه تساعدك علي تنفيذ مشاريع powerpoint, word office, etc.....",
  openGraph: {
    title: "Light UP -  لايت اب",
    description: "لايت اب هي منصه تساعدك علي تنفيذ مشاريع powerpoint, word office, etc.....",
    images: [{url: '/blackLamp.jpeg'}],
  },
};

export default function RootLayout({
  children
}) {
  return (
    <html lang="en">
      <body
        className={`${bigX.variable} ${robert.variable}`}
      >
        <BackgroundGrid boxSize={80} />
        <GhostIcon fill='white' size={70} />
        {children}
      </body>
    </html>
  );
}
