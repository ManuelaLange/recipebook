"use client";

import { useContext, use } from "react";
import { RecipeContext } from "@/app/recipeContext";
import { CategoryContext } from "@/app/categoryContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context";
import { MdOutlineHideImage } from "react-icons/md";
import { IoMdArrowBack } from "react-icons/io";
import CardRecipe from "../components/CardRecipe";

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
    <div className="max-w-screen-lg m-auto">
      <div className="flex flex-row w-min items-center pt-24 group cursor-pointer group">
        <IoMdArrowBack
          className=" w-6 h-6 font- cursor-pointer text-black group-hover:text-orange-600 "
          onClick={() => router.push("/home")}
        />
        <span
          className="pl-2 text-black group-hover:text-orange-600"
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
        {searchRecipe.map((recipe, index) => {
          return (
            <CardRecipe
              key={index}
              recipe={recipe}
              handleRecipePage={handleRecipePage}
            />
          );
        })}
      </div>
    </div>
  );
}
