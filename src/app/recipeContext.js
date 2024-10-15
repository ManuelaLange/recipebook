"use client";

import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([
    {
      id: uuidv4(),
      pageName: "bolo-de-milho",
      name: "Bolo de milho",
      category: "Bolos",
      categoryValue: "bolos",
      time: "50 min",
      ingredients: [
        "1 lata de milho",
        "1 lata de açúcar",
        "1/2 lata de óleo de soja",
        "1 colher (sopa) de fermento em pó",
        "Farinha de trigo para untar",
        "1 lata de leite (medida da lata de milho)",
        "1 lata de flocão de milho",
        "3 ovos inteiros",
        "Margarina para untar",
      ],
      instructions: [
        "Escorra o milho e use a própria lata para as medidas.",
        "Unte e enfarinhe uma forma de bolo com furo.",
        "Preaqueça o forno.",
        "Coloque no liquidificador o milho (já escorrido), o leite, açúcar, flocão de milho, óleo, ovos e bata bem até que o milho fique bem moído.",
        "Se quiser, pode acrescentar duas colheres de sopa de coco ralado.",
        "Acrescente o fermento em pó e pulse o liquidificador 3 vezes.",
        "Despeje essa massa na forma e leve ao forno médio.",
        "Deixe assar por aproximadamente 40 minutos.",
        "Faça o teste do palito e observe um tom dourado médio para saber que o bolo está pronto.",
        "Espere esfriar totalmente para desenformar.",
      ],
      img: "https://static.itdg.com.br/images/360-240/b10b7d3a5b1f31b9e2b189fae972f05a/shutterstock-1989493415-1-.jpg",
    },
    {
      id: uuidv4(),
      pageName: "cookie",
      name: "Cookie",
      category: "Sobremesas",
      categoryValue: "sobremesas",
      time: "25 min",
      ingredients: [
        "2 xícaras de farinha de trigo",
        "1/2 xícara de açúcar",
        "1/2 xícara de açúcar mascavo",
        "1 colher (chá) de fermento em pó",
        "1 colher (chá) de essência de baunilha",
        "1 ovo",
        "100g de manteiga derretida",
        "1 xícara de gotas de chocolate",
      ],
      instructions: [
        "Pré-aqueça o forno a 180°C.",
        "Em uma tigela, misture a farinha, o açúcar e o fermento.",
        "Adicione a manteiga derretida, o ovo e a essência de baunilha, e misture bem.",
        "Adicione as gotas de chocolate e misture até incorporar.",
        "Com a ajuda de uma colher, forme pequenas bolinhas com a massa e coloque-as em uma assadeira forrada com papel manteiga.",
        "Asse por cerca de 12 a 15 minutos ou até os cookies estarem levemente dourados.",
        "Deixe esfriar antes de servir.",
      ],
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT29az35hU_xTqVPYujyfjTDW2dHgTry9LGiw&s",
    },
    {
      id: uuidv4(),
      pageName: "strogonoff-de-frango",
      name: "Strogonoff de Frango",
      category: "Prato Principal",
      categoryValue: "prato-principal",
      time: "40 min",
      ingredients: [
        "500g de peito de frango em cubos",
        "1 cebola picada",
        "2 dentes de alho picados",
        "2 colheres (sopa) de óleo",
        "1 lata de creme de leite",
        "3 colheres (sopa) de ketchup",
        "2 colheres (sopa) de mostarda",
        "200g de champignon fatiado",
        "Sal e pimenta a gosto",
      ],
      instructions: [
        "Aqueça o óleo em uma panela e refogue a cebola e o alho até dourarem.",
        "Adicione o frango e frite até dourar por todos os lados.",
        "Adicione o ketchup, a mostarda e o champignon, mexendo bem.",
        "Abaixe o fogo e acrescente o creme de leite, mexendo até incorporar.",
        "Ajuste o sal e a pimenta a gosto.",
        "Sirva com arroz branco e batata palha.",
      ],
      img: "https://www.unileverfoodsolutions.com.br/dam/global-ufs/mcos/SLA/calcmenu/recipes/BR-recipes/chicken-&-other-poultry-dishes/strogonoff-de-frango/main-header.jpg",
    },
    {
      id: uuidv4(),
      pageName: "yakisoba",
      name: "Yakisoba",
      category: "Prato Principal",
      categoryValue: "prato-principal",
      time: "30 min",
      ingredients: [
        "200g de macarrão para yakisoba",
        "100g de carne bovina em tiras",
        "100g de frango em tiras",
        "1 cenoura em rodelas finas",
        "1 cebola em fatias",
        "1 pimentão em tiras",
        "1/2 brócolis em floretes",
        "1/2 couve-flor em floretes",
        "2 colheres (sopa) de molho de soja (shoyu)",
        "1 colher (sopa) de óleo de gergelim",
        "1 colher (sopa) de óleo de soja",
        "Sal e pimenta a gosto",
      ],
      instructions: [
        "Cozinhe o macarrão para yakisoba de acordo com as instruções da embalagem.",
        "Em uma panela grande, aqueça o óleo de soja e o óleo de gergelim.",
        "Adicione a carne bovina e o frango, fritando até dourar.",
        "Acrescente a cebola, cenoura, pimentão, brócolis e couve-flor, refogando até que fiquem macios.",
        "Adicione o molho de soja e misture bem.",
        "Junte o macarrão cozido e misture para que todos os ingredientes fiquem bem incorporados.",
        "Sirva quente.",
      ],
      img: "https://simplificandoacozinha.com.br/wp-content/uploads/2024/07/55572-768x571.jpg",
    },
    {
      id: uuidv4(),
      pageName: "panqueca-de-carne",
      name: "Panqueca de Carne",
      category: "Prato Principal",
      categoryValue: "prato-principal",
      time: "40 min",
      ingredients: [
        "1 xícara de leite",
        "1 ovo",
        "1 xícara de farinha de trigo",
        "1 pitada de sal",
        "300g de carne moída",
        "1 cebola picada",
        "2 dentes de alho picados",
        "2 colheres (sopa) de óleo",
        "1 lata de molho de tomate",
        "Queijo ralado a gosto",
      ],
      instructions: [
        "Bata o leite, ovo, farinha de trigo e sal no liquidificador até obter uma massa homogênea.",
        "Aqueça uma frigideira antiaderente e faça as panquecas, dourando dos dois lados. Reserve.",
        "Em uma panela, aqueça o óleo e refogue a cebola e o alho.",
        "Adicione a carne moída e cozinhe até dourar.",
        "Junte o molho de tomate e cozinhe por mais alguns minutos.",
        "Recheie as panquecas com a carne moída, enrole e cubra com o restante do molho de tomate.",
        "Polvilhe queijo ralado por cima e leve ao forno para gratinar por 10 minutos.",
        "Sirva quente.",
      ],
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4f4dXhrvU0aDcQoCmtbWjyZbCpQPZtdviA&s",
    },
  ]);

  const addRecipe = ({ name, category, time, ingredients, instructions }) => {
    const id = uuidv4(); // gera um ID único
    const pageName = name.toLowerCase().replace(/\s+/g, "-"); // converte o nome para um formato URL-friendly
    const categoryValue = category.toLowerCase().replace(/\s+/g, "-"); // transforma a categoria em lowercase para fins de consistência

    const newRecipe = {
      id,
      pageName,
      name,
      category,
      categoryValue,
      time,
      ingredients,
      instructions,
    };

    setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
  };

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, addRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
