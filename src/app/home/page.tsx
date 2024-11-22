"use client";
import Form from "../components/Form";
import { useState, useContext } from "react";
import { RecipeContext } from "../recipeContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context";
// import { UserContext } from "../context";
import { MdOutlineHideImage } from "react-icons/md";
import Menssage from "../components/Menssage";
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
  const [modalSuccess, setModalSuccess] = useState(false);
  const { recipes, recipesUser } = useContext(RecipeContext);
  const router = useRouter();
  const { search } = useContext(SearchContext);
  // const { userSession } = useContext(UserContext);

  const limitRecipes = 4;

  const lowerSearch = search.toLowerCase(); // tirar do looping de busca para não ser feito essa processo toda vez que o input chamar o onchange, isso melhora a performance.

  const searchRecipe = recipes.filter((recipe: { name: string }) =>
    recipe.name.toLowerCase().includes(lowerSearch)
  );
  const searchRecipeUser = recipesUser.filter((recipe: { name: string }) =>
    recipe.name.toLowerCase().includes(lowerSearch)
  );

  function NewRecipe() {
    SetModalNewRecipe(true);
  }

  function CloseModalRecipe() {
    SetModalNewRecipe(false);
  }

  function handleRecipePage(recipe: Recipe) {
    router.push(`/recipe/${recipe.id}`);
  }

  function handlePageAllRecipes() {
    router.push("/allRecipes");
  }

  return (
    <div>
      {modalSuccess && <Menssage />}
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
        {searchRecipe.length > limitRecipes && (
          <a
            className=" text-orange-500 underline block text-right cursor-pointer hover:text-orange-600"
            onClick={handlePageAllRecipes}
          >
            Acessar todas
          </a>
        )}
      </div>

      {recipes ? (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
          {searchRecipe
            .slice(0, limitRecipes)
            .map((recipe: Recipe, index: number) => (
              <button
                key={index}
                onClick={() => handleRecipePage(recipe)}
                className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500"
              >
                {recipe.img ? (
                  <img
                    className="w-36 h-28 rounded-lg w-"
                    src={recipe.img}
                  ></img>
                ) : (
                  <MdOutlineHideImage className="w-14 h-14 rounded-lg text-gray-500" />
                )}
                <p>{recipe.name}</p>
              </button>
            ))}
        </div>
      ) : (
        <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
          <h4 className=" ">Nenhuma receita cadastrada no nosso banco</h4>
        </div>
      )}

      <div className="flex flex-grow max-w-screen-lg justify-between m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
        <h4>Minhas receitas</h4>
        {recipesUser.length > limitRecipes && (
          <a className=" text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">
            Acessar todas
          </a>
        )}
      </div>

      {recipesUser.length === 0 ? (
        <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
          <h4 className=" ">Você ainda não possui receita cadastrada.</h4>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
          {searchRecipeUser.map((recipe: Recipe, index: number) => (
            <button
              key={index}
              onClick={() => handleRecipePage(recipe)}
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
          ))}
        </div>
      )}

      {modalNewRecipe && (
        <Form recipe={null} closeModalFormRecipe={CloseModalRecipe} />
      )}
    </div>
  );
}
