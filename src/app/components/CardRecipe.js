import { MdOutlineHideImage } from "react-icons/md";
import { LuChefHat } from "react-icons/lu";
import { useContext } from "react";
import { RecipeContext } from "../recipeContext";

export default function CardRecipe({ recipe, handleRecipePage }) {
  const { recipes } = useContext(RecipeContext);
  return (
    <>
      <div
        key={recipe.id}
        onClick={() => handleRecipePage(recipe)}
        className="flex font-[family-name:var(--font-geist-sans)] flex-col gap-4 border cursor-pointer border-orange-500 rounded-md "
      >
        {recipe.img ? (
          <img className="w-full h-full" src={recipe.img} alt="Recipe Image" />
        ) : (
          <MdOutlineHideImage className="w-14 h-14 rounded-lg text-gray-500" />
        )}
        <div className="flex flex-col gap-2 mx-2 mb-2">
          <p className="boder border-b-2 mb-2 font-semibold pb-2 ">
            {recipe.name}
          </p>
          <div className="flex flex-row gap-2">
            <LuChefHat className="w-5 h-5 text-orange-500" />
            <p>{recipe.user_name}</p>
          </div>
        </div>
      </div>
    </>
  );
}
