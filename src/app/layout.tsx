import GSAP from "./lib/gsap";
import PageTransition from "./utils/pageTransition";
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
  title: "Gastronogeek",
  description: "Gastronogeek, the geek cooking website",
  keywords: [
    "geek",
    "cooking",
    "recipes",
    "gastronogeek",
    "food",
    "recettes",
    "cuisine",
  ],
  authors: [{ name: "Fabien Lapert" }],
  creator: "Fabien Lapert",
  publisher: "Fabien Lapert",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0F172A] text-white">
        <GSAP>
          <PageTransition>
            <Header />
            {children}
            <Footer />
          </PageTransition>
        </GSAP>
      </body>
    </html>
  );
}
