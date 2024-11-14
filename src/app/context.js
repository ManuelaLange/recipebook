"use client";

import { createContext, useState, useEffect } from "react";
import { auth } from "./configFirebase";

// Context para barra de pesquisa
const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
export { SearchProvider, SearchContext };

// Context para o userSession
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [userSession, setUserSession] = useState("");
  useEffect(() => {
    // Observar mudanças no status de autenticação
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const token = await user.getIdToken();
          const tokenResult = await user.getIdTokenResult();
          console.log(tokenResult);

          // Check token expiration
          if (new Date().getTime() / 1000 > tokenResult.expirationTime) {
            await auth.signOut();
            setUserSession("");
          } else {
            setUserSession(user.uid);
          }
        } catch (error) {
          console.error("Token validation error:", error);
          setUserSession("");
        }
      } else {
        // Usuário deslogado, limpar o estado
        setUserSession("");
      }
    });

    // Limpar o observador ao desmontar o componente
    return () => unsubscribe();
  }, []);

  const refreshSession = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await user.getIdToken(true); // Force token refresh
      } catch (error) {
        console.error("Token refresh error:", error);
        await auth.signOut();
        setUserSession("");
      }
    }
  };

  return (
    <UserContext.Provider
      value={{ userSession, setUserSession, refreshSession }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };

// colocar mensagens de sucesso ao longo do site
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
// editar receita não salva no banco de dados
// fazer pagina de cateogrias.
// adicinar um icone de favoritos
// fazer pagina de acessar todas
// colocar uma imagem nas receitas que não tem imagem 
// organizar as receitas com conteúdo certo
