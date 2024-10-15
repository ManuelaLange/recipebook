"use client";

import { createContext, useState } from "react";

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

//fazer as novas receitas cadastradas no form enviarem para o localstorage
//editar receita
// fazer icone de lixo nos ingredientes e modo de preparo
