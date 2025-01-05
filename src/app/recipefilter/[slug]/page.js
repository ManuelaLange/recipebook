"use client";

import { useContext, use } from "react";
import { RecipeContext } from "@/app/recipeContext";
import { CategoryContext } from "@/app/categoryContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../../context";
import { MdOutlineHideImage } from "react-icons/md";
import CardRecipe from "@/app/components/CardRecipe";

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
    router.push(`/recipe/${recipe.id}`);
  }

  return (
    <div>
      <div className="flex flex-row items-center m-auto max-w-screen-lg pt-28 group">
        <span
          className="pl-2 text-black group-hover:text-orange-600 cursor-pointer"
          onClick={() => router.push("/home")}
        >
          Voltar
        </span>
      </div>
      <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg mb-4">
        <h1 className="my-3 font-semibold text-5xl text-orange-500">
          {pageCategory.name}
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
