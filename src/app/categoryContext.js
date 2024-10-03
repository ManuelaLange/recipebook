"use client";

import { createContext, useState } from "react";

const CategoryContext = createContext();

const CategoryProvider = ({ children }) => {
  const [categoryRecipes, setCategoryRecipes] = useState([
    {
    title:"prato-principal",
    name:"Prato principal",
    },
    {
    title:"sobremesas",
    name:"Sobremesas",
    },
    {
    title:"sopas",
    name:"Sopas",
    },
    {
    title:"carnes",
    name:"Carnes",
    },
    {
    title:"bolos",
    name:"Bolos",
    },
    {
    title:"massas",
    name:"Massas",
    }

    ]);
  return (
    <CategoryContext.Provider value={{ categoryRecipes, setCategoryRecipes }}>
      {children}
    </CategoryContext.Provider>
  );
};
export { CategoryProvider, CategoryContext };
