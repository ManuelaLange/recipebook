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
// editar ingrediente
// enter nao ta funcionando no formulario de editar, ver oq ta acontecendo
