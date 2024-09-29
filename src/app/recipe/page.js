"use client";
import { RecipeContext } from "../recipeContext";
import { useContext } from "react";

const { recipe, setRecipe } = useContext(RecipeContext);

export default function Recipe() {
  return (
    <div className="flex flex-col items-center py-24 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
      olá mundo
    </div>
  );
}
