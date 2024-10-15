"use client";
import { IoClose } from "react-icons/io5";
import { CategoryContext } from "../categoryContext";
import { useContext, useState } from "react";
import { RecipeContext } from "../recipeContext";
import { CiCirclePlus } from "react-icons/ci";

export default function Form({ closeModalFormEditRecipe }) {
  const { categoryRecipes } = useContext(CategoryContext);
  const { recipes, addRecipe } = useContext(RecipeContext);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    time: "",
    ingredients: [],
    instructions: [],
  });

  const [addIngredients, setAddIngredients] = useState("");
  const [addInstrucitons, setAddInstructions] = useState("");

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log({ name, value });
  }

  function handleInputIngredients(e) {
    e.preventDefault();
    const value = e.target.value;
    setAddIngredients(value);
  }

  function handleInputInstructions(e) {
    e.preventDefault();
    const value = e.target.value;
    setAddInstructions(value);
  }

  function addNewIngredient() {
    if (!addIngredients.length) {
      alert("Adicione um ingrediente");
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ingredients: [...prevFormData.ingredients, addIngredients], // Adiciona o novo ingrediente ao array
      }));
    }
    console.log(formData);
  }
  function addNewInstructions() {
    if (!addInstrucitons.length) {
      alert("Adicione o modo de preparo");
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        instructions: [...prevFormData.instructions, addInstrucitons], // Adiciona o novo ingrediente ao array
      }));
    }
    console.log(formData);
  }
  function handleKeyPressIngredients(e) {
    if (e.key === "Enter" && e.target === document.activeElement) {
      addNewIngredient();
      e.preventDefault();
    }
  }
  function handleKeyPressInstrucitons(e) {
    if (e.key === "Enter") {
      addNewInstructions();
      e.preventDefault();
    }
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // Impede o envio do formulário ao pressionar Enter
    }
  };

  return (
    <div className=" flex-col pt-10 fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="my-4 w-full md:w-1/2 lg:w-1/3 mx-auto flex flex-col items-center max-h-screen overflow-y-auto bg-gray-100 rounded-lg shadow-lg font-[family-name:var(--font-geist-sans)]">
        <div className="w-full flex flex-row pt-4 justify-between px-6">
          <h2 className=" font-bold text-orange-500 text-xl">Editar receita</h2>

          <IoClose
            onClick={closeModalFormEditRecipe}
            className="flex w-7 h-7 cursor-pointer"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          onKeyDown={handleKeyDown}
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

            <div className="flex flex-row gap-1">
              <input
                required
                name="ingredients"
                type="text"
                placeholder="Ingrediente"
                className=" w-full px-3 py-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                onChange={handleInputIngredients}
                onKeyUp={handleKeyPressIngredients}
              />
              <button type="button" onClick={addNewIngredient}>
                <CiCirclePlus size={30} />
              </button>
            </div>
            <div className="flex flex-col gap-1 ">
              {formData.ingredients.length > 0 &&
                formData.ingredients.map((ingredient, index) => {
                  return (
                    <p
                      key={index}
                      className="w-full px-3 py-2 border rounded-md border-gray-300"
                    >
                      {ingredient}
                    </p>
                  );
                })}
            </div>
          </div>

          <div className="w-full mb-2">
            <label className="block text-gray-700 font-bold mb-2">
              Modo de preparo
            </label>
            <div className="flex flex-row gap-1">
              <input
                required
                name="instructions"
                type="text"
                placeholder="Passo a passo da receita"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                onChange={handleInputInstructions}
                onKeyUp={handleKeyPressInstrucitons}
              />
              <button type="button" onClick={addNewInstructions}>
                <CiCirclePlus size={30} />
              </button>
            </div>
            <div className="flex flex-col gap-1 ">
              {formData.instructions.length > 0 &&
                formData.instructions.map((instruction, index) => {
                  return (
                    <p
                      key={index}
                      className="w-full px-3 py-2 border rounded-md border-gray-300"
                    >
                      {instruction}
                    </p>
                  );
                })}
            </div>
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
