"use client";
import { RecipeContext } from "../../recipeContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function Page({ params }) {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const pageRecipe = recipes.find((recipe) => recipe.id === params.slug);
  console.log("page", pageRecipe);

  return (
    <div>
      <IoMdArrowBack onClick={() => router.push("/")} />
      <span
        style={{
          cursor: "pointer",
          color: "blue",
          lineHeight: 10,
          padding: 20,
        }}
        onClick={() => router.push("/")}
      >
        voltar
      </span>
      {/* RECEITA: {JSON.stringify(pageRecipe)} {params.slug} <br /> */}
      {params.slug}
    </div>
  );
}
