"use client";

import { createContext, useState, useEffect } from "react";
import { auth, db } from "./configFirebase";
import { doc, getDoc } from "firebase/firestore";

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
  const [userProfile, setUserProfile] = useState("");

  useEffect(() => {
    profileUser();
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
  }, [userSession]);

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

  const profileUser = async () => {
    try {
      if (!userSession) {
        console.log("No user session available");
        return;
      }

      const docRef = doc(db, "users", userSession);
      const userProfile1 = await getDoc(docRef);

      if (!userProfile1.exists()) {
        console.log("No user profile found");
        return;
      }

      setUserProfile(userProfile1.data().username);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        userSession,
        setUserSession,
        refreshSession,
        profileUser,
        userProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext };

// deletar receita
// colocar carregamento na pagina de todas as receitas
// colocar mensagens de sucesso ao longo do site
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
// fazer pagina do perfil do usuario
// usuario logado com o google não tem como colocar o nome e sobrenome.
// adicinar um icone de favoritos
// fazer pagina de favoritos
