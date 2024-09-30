"use client";

import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([
    {
      id: uuidv4(),
      name: "Bolo de milho",
      category: "Bolo",
      time: "50 min",
      ingredients: [
        "1 lata de milho",
        "1 lata de açucar",
        "1/2 lata de óleo de soja",
        "e colher (sopa) de fermento em pó",
        "farinha de trigo para untar",
        "1 lata de leite (medida da lata de milho)",
        "1 lata de flocão de milho",
        "3 ovos inteiros",
        "margarina para untar",
      ],
      instructions: [
        "Escorra o milho e use a própria lata para as medidas.",
        "Unte e enfarinhe uma forma de bolo com furo.",
        "Preaqueça o forno.",
        "Coloque no liquidificador o milho (já escorrido), o leite, açúcar, flocão de milho, óleo, ovos e bata bem até que o milho fique bem moído.",
        "Se quiser, pode acrescentar duas colheres de sopa de coco ralado.",
        "Acrescente o fermento em pó e pulse o liquidificador 3 vezes.",
        "Despeje essa massa na forma e leve ao forno médio.",
        "Deixe assar por, aproximadamente, 40 minutos.",
        "Faça o teste do palito e observe um tom dourado médio, para saber que o bolo está pronto.",
        "Espere esfriar totalmente para desenformar.",
      ],
    },
    {
      id: uuidv4(),
      name: "Cookie",
      category: "Bolo",
      time: "50 min",
      ingredients: [
        "1 lata de milho",
        "1 lata de açucar",
        "1/2 lata de óleo de soja",
        "e colher (sopa) de fermento em pó",
        "farinha de trigo para untar",
        "1 lata de leite (medida da lata de milho)",
        "1 lata de flocão de milho",
        "3 ovos inteiros",
        "margarina para untar",
      ],
      instructions: [
        "Escorra o milho e use a própria lata para as medidas.",
        "Unte e enfarinhe uma forma de bolo com furo.",
        "Preaqueça o forno.",
        "Coloque no liquidificador o milho (já escorrido), o leite, açúcar, flocão de milho, óleo, ovos e bata bem até que o milho fique bem moído.",
        "Se quiser, pode acrescentar duas colheres de sopa de coco ralado.",
        "Acrescente o fermento em pó e pulse o liquidificador 3 vezes.",
        "Despeje essa massa na forma e leve ao forno médio.",
        "Deixe assar por, aproximadamente, 40 minutos.",
        "Faça o teste do palito e observe um tom dourado médio, para saber que o bolo está pronto.",
        "Espere esfriar totalmente para desenformar.",
      ],
    },
  ]);
  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
