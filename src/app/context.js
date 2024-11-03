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

  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };

// arrumar o login automatico
// logar com o google
// colocar mensagens de sucesso ao longo do site
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
// fazer pagina de cateogrias.
// editar receita não salva no banco de dados
// adicinar um icone de favoritos
// aparecer o botão de editar apenas nas receitas do usuario
