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
  const [userSession, setUserSession] = useState({});
  useEffect(() => {
    // Observar mudanças no status de autenticação
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Usuário logado, armazenar o uid
        setUserSession(auth.currentUser.uid);
        console.log(auth.currentUser.uid);
      } else {
        // Usuário deslogado, limpar o estado
        setUserSession(null);
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

//fazer as novas receitas cadastradas no form enviarem para o banco de dados
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
// arrumar o header para aparecer só na pagina de login
// apagar conteúdo ap´´os a pessoa dar enter no ingrediente e na instrução
// colocar um if se a pessoa não tiver receita.
