"use client";
import { RecipeContext } from "../../recipeContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default function Page({ params }) {
  const router = useRouter();
  const { recipes } = useContext(RecipeContext);
  const pageRecipe = recipes.find((recipe) => recipe.pageName === params.slug);
  console.log("page", pageRecipe);
  console.log("params", params);

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
      <div className="flex flex-col items-center py-24 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        {/* RECEITA: {JSON.stringify(pageRecipe)} {params.slug} <br /> */}
        {params.slug}
      </div>
    </div>
  );
}
