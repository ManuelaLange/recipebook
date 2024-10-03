"use client";
import { CategoryContext } from "../../categoryContext";
import { useContext } from "react";

export default function Page({ params}) {
    const { categoryRecipes } = useContext(CategoryContext);
    const pageFilterRecipe = categoryRecipes.find((category) => category.title === params.slug);
    console.log("page", pageFilterRecipe);
    console.log("params", params);
  
    return (
        <div>
            {params.slug}

        </div>
    ) }
