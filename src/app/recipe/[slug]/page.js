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
      <div className="flex flex-row pt-24 items-center max-w-screen-lg m-auto hover:text-orange-600">
      <IoMdArrowBack className=" w-6 h-6 font- cursor-pointer text-orange-500 hover:text-orange-600 " onClick={() => router.push("/")}/>
      <span
        style={{
          cursor: "pointer",
          paddingLeft:"0.5em",
          color: "#f97316",
          hover:"#ea580c",

        }}
        onClick={() => router.push("/")}
      >Voltar
        
      </span>
      

      </div>
      
      <div className="flex flex-col items-center p-3 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        {/* RECEITA: {JSON.stringify(pageRecipe)} {params.slug} <br /> */}
        <h1 className="my-3 font-semibold text-3xl text-orange-500">{pageRecipe.name}</h1>
        <div className="bg-center bg-cover mx-10 w-5/12 h-80" style={{ backgroundImage: `url(${pageRecipe.img})`, borderRadius:"10%"}}></div>
        <div className="p-3 my-4 m-auto w-3/4 rounded-lg border border-orange-500 bg-neutral-100">
          <div>
          <h3 className="my-3 font-semibold text-lg text-orange-500 text-center">Ingredientes</h3>
          <ul className="custom-list list-[disc] mx-10 ">
            {pageRecipe.ingredients.map((ingredient)=> {
              return(
                <li key={ingredient} className="boder border-b-2 mb-2 ">{ingredient}</li>

              )
            })}
            
          </ul>
          </div>
          </div>
          <div className="p-3 my-4 m-auto w-3/4 rounded-lg border border-orange-500 bg-neutral-100">
          <div>
          <h3 className="my-3 font-semibold text-lg text-orange-500 text-center">Modo de preparo</h3>
          <ol className="custom-list list-[decimal] mx-10 ">
            {pageRecipe.instructions.map((instruction) => {
              return (
                <li key={instruction} className="boder border-b-2 mb-2 ">{instruction}</li>
                
              )
            })}
        
          </ol>
          </div>
        </div>
        <style>
        {`
          .custom-list li::marker {
            color: #ff6600; 
            font-size: 1.5rem; 
            font-weight: bold;
             
          }
        `}
      </style>
        
        
        

      </div>
      
    </div>
  );
}
