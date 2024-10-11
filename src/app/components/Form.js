"use client";
import { IoClose } from "react-icons/io5";
import { CategoryContext } from "../categoryContext";
import { useContext, useState } from "react";
import { RecipeContext } from "../recipeContext";

export default function Form({ closeModalFormRecipe }) {
  const { categoryRecipes } = useContext(CategoryContext);
  const { recipes, addRecipe } = useContext(RecipeContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    time: "",
    ingredients: [""],
    instructions: [""],
  });

  const [addIngredients, setAddIngredients] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log({ name, value });
  }

  function handleInputIngredients(e) {
    const value = e.target.value;
    setAddIngredients(value);
  }

  function addNewIngredient() {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: [...prevFormData.ingredients, addIngredients], // Adiciona o novo ingrediente ao array
    }));
    console.log(formData);
  }

  function handleSubmit(e) {
    e.preventDefault();
    addRecipe(formData);

    console.log("nova receita:", formData);

    setFormData({
      name: "",
      category: "",
      time: "",
      ingredients: [""],
      instructions: [""],
    });
  }

  return (
    <div className=" flex-col pt-10 fixed inset-0 bg-black/60 flex items-center justify-center overflow-y-auto">
      <div className="my-4 w-full md:w-1/2 lg:w-1/3 mx-auto flex flex-col items-center bg-gray-100 rounded-lg shadow-lg font-[family-name:var(--font-geist-sans)]">
        <div className="w-full flex flex-row pt-4 justify-between px-6">
          <h2 className=" font-bold text-orange-500 text-xl">Nova receita</h2>

          <IoClose
            onClick={closeModalFormRecipe}
            className="flex w-7 h-7 cursor-pointer"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full mx-auto flex flex-col items-center px-6 py-3 font-[family-name:var(--font-geist-sans)]"
        >
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Nome da receita
            </label>
            <input
              required
              name="name"
              type="text"
              placeholder="Nome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Categoria
            </label>
            <select
              required
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.category}
              onChange={handleInputChange}
            >
              <option value="">Selecione a categoria</option>
              {categoryRecipes.map((category) => {
                return (
                  <option key={category.title} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Tempo de preparo
            </label>
            <input
              required
              name="time"
              type="text"
              placeholder="Ex: 45min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Ingredientes
            </label>

            <input
              name="ingredients"
              type="text"
              placeholder="Ingrediente"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              onChange={handleInputIngredients}
            />
            <button type="button" onClick={addNewIngredient}>
              Adicionar Ingrediente
            </button>
          </div>
          {formData.ingredients.length > 0 &&
            formData.ingredients.map((ingredient, index) => {
              return <div key={index}>{ingredient} </div>;
            })}

          <div className="w-full mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Modo de preparo
            </label>
            <input
              required
              name="instructions"
              type="text"
              placeholder="Passo a passo da receita"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.instructions}
              onChange={handleInputChange}
            />
          </div>

          <div className="w-full mb-2 flex flex-col">
            <label className="text-gray-700 font-bold" htmlFor="imageInput">
              Anexar Imagem:
            </label>
            <input type="file" id="imageInput" accept="image/*"></input>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            Enviar Receita
          </button>
        </form>
      </div>
    </div>
  );
}

//setFormData((prevFormData) => ({
//  ...prevFormData,
//  ingredients: [value], // Adiciona o novo ingrediente ao array
//}));
