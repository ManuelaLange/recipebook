"use client";
import { RecipeContext } from "@/app/recipeContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import Form from "../../components/Form";
import Loading from "../../components/Loading";

export default function Page() {
  const { selectedRecipe, setSelectedRecipe, loading } =
    useContext(RecipeContext);
  const router = useRouter();

  // const pageRecipe = recipes.find(
  //   (recipe) => recipe.pageName === resolvedParams.slug
  // );

  const [openModalEditForm, setOpenModalEditForm] = useState(false);

  function openModalFormEditRecipe() {
    setOpenModalEditForm(true);
  }
  function closeFormEditRecipe() {
    setOpenModalEditForm(false);
  }

  function handleBackPage() {
    setSelectedRecipe(null);
    router.back();
  }
  console.log(selectedRecipe);
  return (
    <div>
      <div className="flex flex-row justify-between pt-24 items-center max-w-screen-lg m-auto hover:text-orange-600">
        <div className="flex flex-row">
          <IoMdArrowBack
            className=" w-6 h-6 font- cursor-pointer text-orange-500 hover:text-orange-600 "
            onClick={handleBackPage}
          />
          <span
            style={{
              cursor: "pointer",
              paddingLeft: "0.5em",
              color: "#f97316",
              hover: "#ea580c",
            }}
            onClick={() => router.push("/home")}
          >
            Voltar
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <span
            style={{
              cursor: "pointer",
              paddingLeft: "0.5em",
              color: "#f97316",
              hover: "#ea580c",
            }}
            onClick={openModalFormEditRecipe}
          >
            Editar receita
          </span>
          <BiEditAlt
            className=" w-6 h-6 font- cursor-pointer text-orange-500 hover:text-orange-600 "
            onClick={openModalFormEditRecipe}
          />
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="flex flex-col items-center font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
          <div>
            <h1 className="my-3 font-semibold text-3xl text-orange-500">
              {selectedRecipe && selectedRecipe.name}
            </h1>
            <h1 className="mb-3 text-center text-base text-orange-500">
              Categoria: {selectedRecipe && selectedRecipe.category}
            </h1>
            <h1 className="mb-3 text-center text-base text-orange-500">
              Tempo de preparo: {selectedRecipe && selectedRecipe.time}
            </h1>
          </div>
          <div className="flex flex-row justify-between w-full items-center">
            <div
              className="bg-center bg-cover mx-10 w-3/5 h-80"
              style={{
                backgroundImage: `url(${selectedRecipe && selectedRecipe.img})`,
                borderRadius: "10%",
              }}
            ></div>
            <div className="p-3 my-4 m-auto w-3/4 rounded-lg border border-orange-500 bg-neutral-100">
              <div>
                <h3 className="my-3 font-semibold text-lg text-orange-500 text-center">
                  Ingredientes
                </h3>
                <ul className="custom-list list-[disc] mx-10 ">
                  {selectedRecipe &&
                    selectedRecipe.ingredients.map((ingredient) => {
                      return (
                        <li key={ingredient} className="boder border-b-2 mb-2 ">
                          {ingredient}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>

          <div className="p-3 my-4 m-auto w-3/4 rounded-lg border border-orange-500 bg-neutral-100">
            <div>
              <h3 className="my-3 font-semibold text-lg text-orange-500 text-center">
                Modo de preparo
              </h3>
              <ol className="custom-list list-[decimal] mx-10 ">
                {selectedRecipe &&
                  selectedRecipe.instructions.map((instruction) => {
                    return (
                      <li key={instruction} className="boder border-b-2 mb-2 ">
                        {instruction}
                      </li>
                    );
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
      )}

      {openModalEditForm && (
        <Form recipe={pageRecipe} closeModalFormRecipe={closeFormEditRecipe} />
      )}
    </div>
  );
}
