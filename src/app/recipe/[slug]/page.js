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
import Menssage from "../../components/Menssage";
import DeletModal from "../../components/DeletModal";

export default function Page({ params }) {
  const { loading, recipes } = useContext(RecipeContext);
  const router = useRouter();
  const resolvedParams = use(params);
  const { userSession } = useContext(UserContext);
  const [openModalDeletRecipe, setOpenModalDeletRecipe] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);

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
    setTimeout(() => {
      setModalSuccess(false);
    }, 5000);
  }

  function handleDeletRecipe() {
    setOpenModalDeletRecipe(true);
  }
  function closeModalDelet() {
    setOpenModalDeletRecipe(false);
  }

  return (
    <div>
      {modalSuccess && (
        <Menssage
          message={"Receita atualizada com sucesso"}
          description={""}
          open={modalSuccess}
          setOpen={setModalSuccess}
        />
      )}
      <div className="flex flex-row justify-between pt-28 items-center max-w-screen-lg m-auto mb-3">
        <div
          className="flex flex-row cursor-pointer items-center hover:text-orange-600 group"
          onClick={() => handleBackPage()}
        >
          <IoMdArrowBack className=" w-6 h-6 text-black group-hover:text-orange-600" />
          <span className="pl-2 text-black group-hover:text-orange-600">
            Voltar
          </span>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Loading />
        </div>
      ) : (
        <div className="grid-cols-2">
          <div className="flex flex-col font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
            <div className="flex flex-row justify-between items-center">
              <h1 className="my-3 mb-6 font-semibold text-5xl text-orange-500">
                {pageRecipe && pageRecipe.name}
              </h1>
              {pageRecipe && pageRecipe.user_id === userSession && (
                <div className="flex flex-row gap-2">
                  <div
                    className="flex flex-row gap-1 p-1 h-min boder border-2 rounded-lg cursor-pointer border-orange-600 hover:bg-orange-500 bg-orange-600 group items-center"
                    onClick={openModalFormEditRecipe}
                  >
                    <BiEditAlt className=" w-6 h-6 font- cursor-pointer text-white " />
                    <span className=" text-white">Editar receita</span>
                  </div>
                  <div className="flex flex-row p-1 h-min gap-1 boder border-2 border-orange-600 rounded-lg cursor-pointer group items-center hover:bg-orange-600">
                    <MdDeleteOutline className=" w-6 h-6  cursor-pointer text-orange-600 group-hover:text-white" />
                    <span
                      className=" text-orange-600 group-hover:text-white"
                      onClick={handleDeletRecipe}
                    >
                      Deletar receita
                    </span>
                  </div>
                </div>
              )}
            </div>
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
        <DeletModal closeModalDelet={closeModalDelet} recipe={pageRecipe} />
      )}
    </div>
  );
}
