"use client";


import { createContext, useState, useEffect } from "react";
import { auth, db } from "./configFirebase"; 
import { doc,collection, getDoc } from "firebase/database"



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

useEffect (() => {
  const unsubscribe = auth.onAuthStateChanged(async (user)=> {
    if (user){
      const uid=user.uid
      const userDocRef = doc(db,"users", uid)
      try {
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserSession({
            uid: user.uid,
            ...userDoc.data(),
          });
        } else {
          console.error("Documento do usuário não encontrado");
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    } else {
      setUserSession(null); 
    }
  });
  return () => unsubscribe();
}, []);


  return (
    <UserContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext }

//fazer as novas receitas cadastradas no form enviarem para o localstorage
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
// fazer formulario de "como podemos te chamar" após o cadastro e criar regra no firebase.
// arrumar o header para aparecer só na pagina de login
