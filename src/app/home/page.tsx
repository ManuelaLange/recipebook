"use client";
import Form from "../components/Form";
import { useState, useContext } from "react";
import { RecipeContext } from "../recipeContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context";
import { UserContext } from "../context";
import { MdOutlineHideImage, MdArrowForwardIos } from "react-icons/md";
import Menssage from "../components/Menssage";
import Loading from "../components/Loading";
// import { collection, getDocs, addDoc, getDoc, doc, query, where } from "firebase/firestore";
// import { db } from "../configFirebase";
import CardRecipe from "../components/CardRecipe";

interface Recipe {
  id: string;
  name: string;
  img: string;
  pageName: string;
}

export default function Home() {
  const [modalNewRecipe, SetModalNewRecipe] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const { recipes, recipesUser, loading } = useContext(RecipeContext);
  const router = useRouter();
  const { search } = useContext(SearchContext);

  const limitRecipes = 4;

  const lowerSearch = search.toLowerCase(); // tirar do looping de busca para não ser feito essa processo toda vez que o input chamar o onchange, isso melhora a performance.

  const searchRecipe = recipes.filter((recipe: { name: string }) =>
    recipe.name.toLowerCase().includes(lowerSearch)
  );
  const searchRecipeUser = recipesUser.filter((recipe: { name: string }) =>
    recipe.name.toLowerCase().includes(lowerSearch)
  );

  function NewRecipe() {
    SetModalNewRecipe(true);
  }

  function CloseModalRecipe() {
    SetModalNewRecipe(false);
  }

  function handleRecipePage(recipe: Recipe) {
    router.push(`/recipe/${recipe.id}`);
  }

  function handlePageAllRecipes() {
    router.push("/allRecipes");
  }
  function handleModalSuccess() {
    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
    }, 5000);
  }

  return (
    <div>
      {modalSuccess && <Menssage />}
      <div className="flex flex-col items-center py-20 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <main className="mx-auto">Cadastre suas receitas</main>

        <button
          onClick={NewRecipe}
          className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400 "
        >
          Adicionar nova receita
        </button>
      </div>
      <div className="flex flex-grow max-w-screen-lg justify-between m-auto mb-4 font-[family-name:var(--font-geist-sans)] ">
        <div
          className=" flex flex-row items-center gap-2 cursor-pointer hover:text-orange-600"
          onClick={handlePageAllRecipes}
        >
          <h4 className="font-semibold text-2xl ">Sugestões de receitas</h4>
          <MdArrowForwardIos />{" "}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg min-h-[200px]">
          <div className="flex items-center justify-center col-span-4">
            <Loading />
          </div>
        </div>
      ) : recipes ? (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
          {searchRecipe
            .slice(0, limitRecipes)
            .map((recipe: Recipe, index: number) => (
              <CardRecipe
                key={index}
                recipe={recipe}
                handleRecipePage={handleRecipePage}
              />
            ))}
        </div>
      ) : (
        <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
          <h4 className=" ">Nenhuma receita cadastrada no nosso banco</h4>
        </div>
      )}

      <div className="flex flex-grow max-w-screen-lg justify-between m-auto mb-4 ">
        <h4 className="font-[family-name:var(--font-geist-sans)] font-semibold text-2xl ">
          Minhas receitas
        </h4>
        {recipesUser.length > limitRecipes && (
          <a className=" text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">
            Acessar todas
          </a>
        )}
      </div>
      {loading ? (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg min-h-[200px]">
          <div className="flex items-center justify-center col-span-4">
            <Loading />
          </div>
        </div>
      ) : recipesUser.length === 0 ? (
        <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
          <h4 className=" ">Você ainda não possui receita cadastrada.</h4>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
          {searchRecipeUser.map((recipe: Recipe, index: number) => (
            <CardRecipe
              key={index}
              recipe={recipe}
              handleRecipePage={handleRecipePage}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col items-center py-2 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <button
          onClick={NewRecipe}
          className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400"
        >
          Adicione a sua receita
        </button>
      </div>

      {modalNewRecipe && (
        <Form
          recipe={null}
          closeModalFormRecipe={CloseModalRecipe}
          handleModalSuccess={handleModalSuccess}
        />
      )}
    </div>
  );
}
