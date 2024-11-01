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
      if (!user) {
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

// logar com o google
// colocar mensagens de sucesso ao longo do site
// colocar campo de loading na entrada.
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
// arrumar o header para não aparecer só na pagina de login
// fazer pagina de cateogrias.
// editar receita não salva no banco de dados
// demora pra entrar
// adicinar um icone de favoritos
