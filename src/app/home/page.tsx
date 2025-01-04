"use client";
import Form from "../components/Form";
import { useState, useContext } from "react";
import { RecipeContext } from "../recipeContext";
import { useRouter } from "next/navigation";
import { SearchContext } from "../context";
import { MdArrowForwardIos } from "react-icons/md";
import Menssage from "../components/Menssage";
import Loading from "../components/Loading";
import CardRecipe from "../components/CardRecipe";
import Switch from "@mui/material/Switch";
import { IoMdArrowBack } from "react-icons/io";
interface Recipe {
  id: string;
  name: string;
  img: string;
  pageName: string;
}

export default function Home() {
  const [modalNewRecipe, SetModalNewRecipe] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isAllRecipes, setIsAllRecipes] = useState(false);
  const { recipes, recipesUser, loading } = useContext(RecipeContext);
  const router = useRouter();
  const { search } = useContext(SearchContext);

  const limitRecipes = 8;

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

  function handleFilterMyRecipes(event: React.ChangeEvent<HTMLInputElement>) {
    setChecked(event.target.checked);
    console.log(checked);
  }

  function handleModalSuccess() {
    setModalSuccess(true);
    setTimeout(() => {
      setModalSuccess(false);
    }, 5000);
  }

  return (
    <div>
      {modalSuccess && (
        <Menssage
          message={"Receita adicionada com sucesso"}
          description={""}
          open={modalSuccess}
          setOpen={setModalSuccess}
        />
      )}
      {!isAllRecipes ? (
        <div className="flex flex-col items-center py-28 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
          <button
            onClick={NewRecipe}
            className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400 "
          >
            Cadastre a sua receita
          </button>
        </div>
      ) : (
        <div className="flex flex-col pt-28 font-[family-name:var(--font-geist-sans)] m-auto my-4 max-w-screen-lg">
          <div
            className="flex flex-row w-min group cursor-pointer group"
            onClick={() => setIsAllRecipes(false)}
          >
            <IoMdArrowBack className=" w-6 h-6 font- cursor-pointer text-black group-hover:text-orange-600 " />
            <span className="pl-2 text-black group-hover:text-orange-600">
              Voltar
            </span>
          </div>
          <h1 className="my-3 font-semibold text-center text-3xl text-orange-500">
            Todas as receitas
          </h1>
        </div>
      )}
      <div
        className={`flex flex-grow max-w-screen-lg items-center m-auto mb-4 font-[family-name:var(--font-geist-sans)] ${
          !isAllRecipes ? "justify-between" : "justify-end"
        }`}
      >
        {!isAllRecipes && (
          <div
            className=" flex flex-row items-center gap-2 cursor-pointer hover:text-orange-600"
            onClick={() => setIsAllRecipes(true)}
          >
            <h4 className="font-semibold text-2xl ">Todas as receitas</h4>
            <MdArrowForwardIos />{" "}
          </div>
        )}
        <div className="flex flex-row items-center justify-end gap-2 ">
          <h6 className="text-black">Filtrar minhas receitas</h6>
          <Switch
            size="medium"
            color="warning"
            onChange={(event) => handleFilterMyRecipes(event)}
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg min-h-[200px]">
          <div className="flex items-center justify-center col-span-4">
            <Loading />
          </div>
        </div>
      ) : recipes ? (
        !checked ? (
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
          <div>
            {recipesUser.length === 0 ? (
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
          </div>
        )
      ) : (
        <div className="text-gray-400 justify-center max-w-screen-lg m-auto mb-4 font-[family-name:var(--font-geist-sans)]">
          <h4 className=" ">Nenhuma receita cadastrada no nosso banco</h4>
        </div>
      )}

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
