import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { CategoryProvider } from "./categoryContext";
import { RecipeProvider } from "./recipeContext";
import { SearchProvider } from "./searchContext";
import { UserProvider } from "./userContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ background: "rgb(250 250 250)" }}
      >
        <SearchProvider>
          <RecipeProvider>
            <CategoryProvider>
              <UserProvider>
                {/* <Header /> */}
                {children}
              </UserProvider>
            </CategoryProvider>
          </RecipeProvider>
        </SearchProvider>
      </body>
    </html>
  );
}
