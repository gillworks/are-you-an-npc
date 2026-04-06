import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Are You an NPC? | Take the Quiz",
  description:
    "Discover your NPC score. Take the viral quiz that reveals how scripted your daily life really is — inspired by the GTA 6 NPC trend.",
  keywords: ["NPC", "GTA 6", "personality quiz", "are you an NPC", "viral quiz"],
  openGraph: {
    title: "Are You an NPC?",
    description:
      "Take the quiz and find out how NPC your daily life really is. Share your results!",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Are You an NPC?",
    description:
      "Take the quiz and find out how NPC your daily life really is. Share your results!",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f0f1a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0f1a] text-white">
        {children}
      </body>
    </html>
  );
}
