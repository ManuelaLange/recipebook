import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { CategoryProvider } from "./categoryContext";
import { RecipeProvider } from "./recipeContext";
import { SearchProvider } from "./context";
import { UserProvider } from "./context";

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
  title: "RecipeBook",
  description: "RecipeBook",
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
          <UserProvider>
            <RecipeProvider>
              <CategoryProvider>
                <Header />
                {children}
              </CategoryProvider>
            </RecipeProvider>
          </UserProvider>
        </SearchProvider>
      </body>
    </html>
  );
}

// function UserStatusWrapper({ children }: { children: React.ReactNode }) {
//   const userSession = useContext(UserContext); // Pega o userSession do contexto do usuário

//   return (
//     <>
//       {userSession && <Header />} {/* Renderiza o Header se userSession estiver presente */}
//       {children}
//     </>
//   );
// }
