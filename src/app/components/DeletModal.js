import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../configFirebase";
import { useRouter } from "next/navigation";
import { useState, useContext } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { RecipeContext } from "../recipeContext";

export default function DeletModal({ closeModalDelet, recipe, user }) {
  const router = useRouter();
  const [messageConfirmDelet, setMessageConfirmDelet] = useState(false);
  const { setRecipes, setRecipeUser } = useContext(RecipeContext);

  async function handleDeletRecipe(recipe) {
    const recipeDoc = doc(db, "recipes", recipe.id);
    await deleteDoc(recipeDoc);
    setRecipes((prevRecipes) =>
      prevRecipes.filter((prevRecipe) => prevRecipe.id !== recipe.id)
    );
    setRecipeUser((prevRecipeUser) =>
      prevRecipeUser.filter((prevRecipe) => prevRecipe.id !== recipe.id)
    );

    setMessageConfirmDelet(true);
    setTimeout(() => {
      closeModalDelet();
      router.back();
    }, 2000);
  }

  async function handleDeletUser(user) {
    const userDoc = doc(db, "users", user.id);
    await deleteDoc(userDoc);
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="my-4 p-4 w-max mx-auto flex flex-col items-center gap-3 bg-gray-100 rounded-lg shadow-lg font-[family-name:var(--font-geist-sans)]">
        <h4 className="text-xl font-bold">
          Deletar {recipe ? "receita" : "perfil"}
        </h4>
        {messageConfirmDelet ? (
          <div className="flex flex-row items-center gap-2">
            <FaRegCheckCircle className="text-green-500 text-2xl" />
            <p>
              {recipe
                ? "receita deletada com sucesso"
                : "perfil deletado com sucesso"}
            </p>
          </div>
        ) : (
          <>
            <p className="text-base">
              Você tem certeza que deseja deletar{" "}
              {recipe
                ? "esta receita"
                : "seu perfil? Ao fazer você irá perder todas as suas receitas cadastradas"}
              ?
            </p>
            <div className="flex flex-row gap-4">
              <button
                className="bg-red-500 text-white p-2 rounded-md"
                onClick={
                  recipe
                    ? () => handleDeletRecipe(recipe)
                    : () => handleDeletUser(user)
                }
              >
                Sim
              </button>
              <button
                onClick={closeModalDelet}
                className="bg-gray-500 text-white p-2 rounded-md"
              >
                Cancelar
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
