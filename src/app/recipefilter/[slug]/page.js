"use client";

import { useContext, use } from "react";
import { RecipeContext } from "@/app/recipeContext";
import { CategoryContext } from "@/app/categoryContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../../context";
import { MdOutlineHideImage } from "react-icons/md";

export default function Page({ params }) {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const { categoryRecipes } = useContext(CategoryContext);
  const { search } = useContext(SearchContext);
  const lowerSearch = search.toLowerCase(); // tirar do looping de busca para não ser feito essa processo toda vez que o input chamar o onchange, isso melhora a performance.

  const resolvedParams = use(params);
  const pageCategory = categoryRecipes.find(
    (category) => category.title === resolvedParams.slug
  );

  const recipeFilterCategory = recipes.filter(
    (recipe) => recipe.categoryValue === pageCategory.title
  );

  const searchRecipe = recipeFilterCategory.filter((recipe) =>
    recipe.name.toLowerCase().includes(lowerSearch)
  );

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
