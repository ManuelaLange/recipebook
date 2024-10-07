"use client";

import { useContext } from "react";
import { RecipeContext } from "@/app/recipeContext";
import { CategoryContext } from "@/app/categoryContext";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const { categoryRecipes } = useContext(CategoryContext);

  const pageCategory = categoryRecipes.find(
    (category) => category.title === params.slug
  );
  console.log("page", pageCategory);
  console.log("params", params);

  const recipeFilterCategory = recipes.filter(
    (recipe) => recipe.categoryValue === pageCategory.title
  );
  console.log({ recipes });

  function handleRecipePage(recipe) {
    router.push(`/recipe/${recipe.pageName}`);
  }

  return (
    <div>
      <div className="flex flex-col items-center py-24 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <h1 className="my-3 font-semibold text-3xl text-orange-500">
          {pageCategory.name}
        </h1>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
        {recipeFilterCategory.map((recipe) => {
          return (
            <button
              key={recipe.id}
              onClick={() => handleRecipePage(recipe)}
              className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500"
            >
              <img className="w-36 h-28 rounded-lg w-" src={recipe.img}></img>
              <p>{recipe.name}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
