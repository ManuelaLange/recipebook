"use client";
import { RecipeContext } from "@/app/recipeContext";
import { useContext, useState, use } from "react";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import Form from "../../components/Form";
import Loading from "../../components/Loading";
import { UserContext } from "@/app/context";
import { MdDeleteOutline, MdOutlineWatchLater } from "react-icons/md";
import { FiTag } from "react-icons/fi";
import { GoDotFill } from "react-icons/go";
import DeletRecipe from "../../components/DeletRecipe";

export default function Page({ params }) {
  const { loading, recipes } = useContext(RecipeContext);
  const router = useRouter();
  const resolvedParams = use(params);
  const { userSession } = useContext(UserContext);
  const [openModalDeletRecipe, setOpenModalDeletRecipe] = useState(false);

  const pageRecipe = recipes.find(
    (recipe) => recipe.id === resolvedParams.slug
  );

  const [openModalEditForm, setOpenModalEditForm] = useState(false);

  function openModalFormEditRecipe() {
    setOpenModalEditForm(true);
  }
  function closeFormEditRecipe() {
    setOpenModalEditForm(false);
  }

  function handleBackPage() {
    router.back();
  }
  console.log(pageRecipe);

  function handleModalSuccess() {
    setModalSuccess(true);
  }

  function handleDeletRecipe() {
    setOpenModalDeletRecipe(true);
  }
  function closeModalDeletRecipe() {
    setOpenModalDeletRecipe(false);
  }

  return (
    <div>
      <div className="flex flex-row justify-between pt-24 items-center max-w-screen-lg m-auto ">
        <div
          className="flex flex-row cursor-pointer items-center hover:text-orange-600 group"
          onClick={() => handleBackPage()}
        >
          <IoMdArrowBack className=" w-6 h-6 text-black group-hover:text-orange-600" />
          <span className="pl-2 text-black group-hover:text-orange-600">
            Voltar
          </span>
        </div>
        {pageRecipe && pageRecipe.user_id === userSession && (
          <div className="flex flex-row gap-2 ">
            <div className="flex flex-row gap-1 boder border-r-2 mb-2 cursor-pointer group">
              <span
                className="pl-2 text-black group-hover:text-orange-600"
                onClick={openModalFormEditRecipe}
              >
                Editar receita
              </span>
              <BiEditAlt
                className=" w-6 h-6 font- cursor-pointer text-black group-hover:text-orange-600 "
                onClick={openModalFormEditRecipe}
              />
            </div>
            <div className="flex flex-row gap-1 cursor-pointer group">
              <span
                className="pl-2 text-black group-hover:text-orange-600"
                onClick={handleDeletRecipe}
              >
                Deletar receita
              </span>
              <MdDeleteOutline className=" w-6 h-6 font- cursor-pointer text-black group-hover:text-orange-600 " />
            </div>
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="grid-cols-2">
          <div className="flex flex-col font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
            <h1 className="my-3 mb-6 font-semibold text-5xl text-orange-500">
              {pageRecipe && pageRecipe.name}
            </h1>
            <div className="flex flex-row   gap-2  mb-3">
              <div className="flex flex-row gap-2 border-r-2 pr-2 justify-center items-center">
                <FiTag className="w-5 h-5" />
                <h1 className="text-base text-black">
                  {pageRecipe && pageRecipe.category}
                </h1>
              </div>
              <div className="flex flex-row gap-2 justify-center items-center">
                <MdOutlineWatchLater className="w-5 h-5" />
                <h1 className="text-base text-black">
                  {pageRecipe && pageRecipe.time}
                </h1>
              </div>
            </div>
            <div className="flex flex-row gap-3">
              <div className="bg-center bg-cover h-80">
                {pageRecipe && pageRecipe.img && (
                  <img
                    src={pageRecipe.img}
                    alt="Recipe Image"
                    className="rounded-lg w-max h-full"
                  ></img>
                )}
              </div>
            </div>
            <div className="p-3 my-4  w-3/4 rounded-lg border border-orange-500 bg-neutral-100">
              <h3 className="my-3 font-semibold text-lg text-orange-500 text-center">
                Ingredientes
              </h3>

              <ul className="mx-10 grid grid-cols-2  ">
                {pageRecipe &&
                  pageRecipe.ingredients.map((ingredient, index) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row gap-2 items-center"
                      >
                        <GoDotFill className="w-4 h-4 text-orange-500" />
                        <li className=" flex m-1 justify-center ">
                          {ingredient}
                        </li>
                      </div>
                    );
                  })}
              </ul>
            </div>

            <div className="p-3 my-4 w-3/4 rounded-lg border border-orange-500 bg-neutral-100">
              <div>
                <h3 className="my-3 font-semibold text-lg text-orange-500 text-center">
                  Modo de preparo
                </h3>
                <ol className="custom-list list-[decimal] mx-10 ">
                  {pageRecipe &&
                    pageRecipe.instructions.map((instruction) => {
                      return (
                        <li
                          key={instruction}
                          className="boder border-b-2 mb-2 "
                        >
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
          <aside className="sticky-colums">
            <h1>Comentários</h1>
          </aside>
        </div>
      )}

      {openModalEditForm && (
        <Form
          recipe={pageRecipe}
          closeModalFormRecipe={closeFormEditRecipe}
          handleModalSuccess={handleModalSuccess}
        />
      )}
      {openModalDeletRecipe && (
        <DeletRecipe
          closeModalDeletRecipe={closeModalDeletRecipe}
          recipe={pageRecipe}
        />
      )}
    </div>
  );
}
