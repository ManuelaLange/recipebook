"use client";

import { createContext, useState } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoryRecipes, setCategoryRecipes] = useState([
    "Sobremesas",
    "Sopas",
    "Bebidas",
    "Carnes",
    "Massas",
    "Bolos",
    "Frutas",
  ]);
  return (
    <CategoryContext.Provider value={{ categoryRecipes, setCategoryRecipes }}>
      {children}
    </CategoryContext.Provider>
  );
};
export { CategoryProvider, CategoryContext };
