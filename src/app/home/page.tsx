"use client";
import Form from "../components/Form";
import { useState, useContext, useEffect } from "react";
import { RecipeContext } from "../recipeContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context";
import { UserContext } from "../context";
import { MdOutlineHideImage } from "react-icons/md";

// import { collection, getDocs, addDoc, getDoc, doc, query, where } from "firebase/firestore";
// import { db } from "../configFirebase";

interface Recipe {
  id: string;
  name: string;
  img: string;
  pageName: string;
}

export default function Home() {
  const [modalNewRecipe, SetModalNewRecipe] = useState(false);
  const { recipes, recipesUser } = useContext(RecipeContext);
  const router = useRouter();
  const { search } = useContext(SearchContext);
  const { userSession } = useContext(UserContext);
  // const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([])

  // const lowerSearch = search.toLowerCase(); // tirar do looping de busca para não ser feito essa processo toda vez que o input chamar o onchange, isso melhora a performance.

  // // const searchRecipe = recipes.filter((recipe: { name: string }) =>
  // //   recipe.name.toLowerCase().includes(lowerSearch)
  // // );

  // useEffect(() => {
  //   const fetchFilteredRecipes = async () => {
  //     try {
  //       const recipesQuery = query(recipes, where("name", ">=", lowerSearch));
  //       const querySnapshot = await getDocs(recipesQuery);

  //       const result = querySnapshot.docs.map((doc) => (doc.data()));

  //       setFilteredRecipes(result);
  //     } catch (error) {
  //       console.error("Erro ao buscar as receitas filtradas: ", error);
  //     }
  //   };

  //   if (search) {
  //     fetchFilteredRecipes();
  //   } else {
  //     setFilteredRecipes([]); // Limpa o filtro quando não há termo de busca
  //   }
  // }, [search]);

  // const searchRecipeUser = recipesUser.filter((recipe: { name: string }) =>
  //   recipe.name.toLowerCase().includes(lowerSearch)
  // );

  function NewRecipe() {
    SetModalNewRecipe(true);
  }

  function CloseModalRecipe() {
    SetModalNewRecipe(false);
  }

  function handleRecipePage(recipe: { id: string; pageName: string }) {
    router.push(`/recipe/${recipe.pageName}`);
  }

  return (
    <div>
      <div className="flex flex-col items-center py-24 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <main className="mx-auto">Cadastre suas receitas</main>
        <main className="mx-auto">Welcome</main>
        <button
          onClick={NewRecipe}
          className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400"
        >
          Adicionar nova receita
        </button>
      </div>
      <div className="flex flex-grow max-w-screen-lg justify-between m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
        <h4 className=" ">Sugestões de receitas</h4>
        <a className=" text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">
          Acessar todas
        </a>
      </div>

      {recipes ? (
        recipes.map((recipe: Recipe, index: number) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg "
          >
            <button
              onClick={() =>
                handleRecipePage({ id: recipe.id, pageName: recipe.pageName })
              }
              className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500"
            >
              {recipe.img ? (
                <img className="w-36 h-28 rounded-lg w-" src={recipe.img}></img>
              ) : (
                <MdOutlineHideImage className="w-14 h-14 rounded-lg text-gray-500" />
              )}
              <p>{recipe.name}</p>
            </button>
          </div>
        ))
      ) : (
        <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
          <h4 className=" ">Nenhuma receita cadastrada no nosso banco</h4>
        </div>
      )}

      <div className="flex flex-grow max-w-screen-lg justify-between m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
        <h4>Minhas receitas</h4>

        <a className=" text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">
          Acessar todas
        </a>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
        {recipesUser ? (
          recipesUser.map((recipe: Recipe) => (
            <button
              key={recipe.id}
              onClick={() =>
                handleRecipePage({ id: recipe.id, pageName: recipe.pageName })
              }
              className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500"
            >
              {recipe.img ? (
                <img
                  className="w-36 h-28 rounded-lg"
                  src={recipe.img}
                  alt="Recipe Image"
                />
              ) : (
                <MdOutlineHideImage className="w-14 h-14 rounded-lg text-gray-500" />
              )}
              <p>{recipe.name}</p>
            </button>
          ))
        ) : (
          <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
            <h4 className=" ">Você ainda não possui receita cadastrada.</h4>
          </div>
        )}
      </div>

      {modalNewRecipe && (
        <Form recipe={null} closeModalFormRecipe={CloseModalRecipe} />
      )}
    </div>
  );
}
