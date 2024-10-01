"use client";
import Form from "./components/Form";
import { useState, useContext } from "react";
import { RecipeContext } from "./recipeContext";
import { useRouter } from "next/navigation";

interface Recipe {
  id: string;
  name: string;
  img: string;
  pageName: string;
}

export default function Home() {
  const [modalNewRecipe, SetModalNewRecipe] = useState(false);
  const { recipes, setRecipes } = useContext(RecipeContext);
  const router = useRouter();

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
        <button
          onClick={NewRecipe}
          className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400"
        >
          Adicionar nova receita
        </button>
      </div>
      <div className="flex flex-grow max-w-screen-lg justify-between m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
        <h4 className=" ">Adicionadas recentemente</h4>
        <a className=" text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">
          Acessar todas
        </a>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
        {recipes.map((recipe: Recipe) => {
          return (
            <button
              key={recipe.id}
              onClick={() =>
                handleRecipePage({ id: recipe.id, pageName: recipe.pageName })
              }
              className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500"
            >
              <img className="w-36 h-28 rounded-lg w-" src={recipe.img}></img>
              <p>{recipe.name}</p>
            </button>
          );
        })}
      </div>

      <div className="max-w-screen-lg mx-auto mb-4 font-[family-name:var(--font-geist-sans)]"></div>

      {modalNewRecipe && <Form closeModalFormRecipe={CloseModalRecipe} />}
    </div>
  );
}
