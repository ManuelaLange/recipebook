"use client";

import { useContext, use } from "react";
import { RecipeContext } from "@/app/recipeContext";
import { CategoryContext } from "@/app/categoryContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context";
import { MdOutlineHideImage } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";

export default function AllRecipesPage() {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const { categoryRecipes } = useContext(CategoryContext);
  const { search } = useContext(SearchContext);
  const lowerSearch = search.toLowerCase(); // tirar do looping de busca para não ser feito essa processo toda vez que o input chamar o onchange, isso melhora a performance.

  const searchRecipe = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(lowerSearch)
  );

  function handleRecipePage(recipe) {
    router.push(`/recipe/${recipe.id}`);
  }

  return (
    <div>
      <div className="flex flex-row items-center m-auto max-w-screen-lg pt-24">
        <IoMdArrowBack
          className=" w-6 h-6 font- cursor-pointer text-orange-500 hover:text-orange-600 "
          onClick={() => router.push("/home")}
        />
        <span
          style={{
            cursor: "pointer",
            paddingLeft: "0.5em",
            color: "#f97316",
            hover: "#ea580c",
          }}
          onClick={() => router.push("/home")}
        >
          Voltar
        </span>
      </div>
      <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <h1 className="my-3 font-semibold text-3xl text-orange-500">
          Todas as receitas
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
        {searchRecipe.map((recipe) => {
          return (
            <button
              key={recipe.id}
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
          );
        })}
      </div>
    </div>
  );
}
