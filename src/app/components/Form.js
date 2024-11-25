"use client";
import { IoClose } from "react-icons/io5";
import { CategoryContext } from "../categoryContext";
import { useContext, useState } from "react";
import { RecipeContext } from "../recipeContext";
import { CiCirclePlus } from "react-icons/ci";
import { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../configFirebase";

export default function Form({
  closeModalFormRecipe,
  recipe,
  handleModalSuccess,
}) {
  const [isEditable, setIsEditable] = useState(false); // para saber se o formulário é para uma nova receita ou se é para edição de uma receita.
  const { categoryRecipes } = useContext(CategoryContext);
  const { addRecipe } = useContext(RecipeContext);

  const [formData, setFormData] = useState({
    id: uuidv4(),
    name: "",
    category: "",
    time: "",
    ingredients: [],
    instructions: [],
    img: "",
  });
  const [editingRecipeId, setEditingRecipeId] = useState(null); // caso a pessoa esteja editando uma receita, é por esse id que saberá qual receita mostrar no formulario

  const [addIngredients, setAddIngredients] = useState(""); // serve para salvar o que está sendo digitado no input do ingredient para adicionar um novo ingrediente
  const [addInstrucitons, setAddInstructions] = useState(""); // serve para salvar o que está sendo digitado no input do instruction para adicionar um novo modo de prepardo
  const [isHoveredIngredient, setIsHoveredIngredient] = useState(null); //serve para ativar ou desativar os icones de edição e excluir
  const [isHoveredInstructions, setIsHoveredInstructions] = useState(null); //serve para ativar ou desativar os icones de edição e excluir
  const [isEditingValue, setIsEditingValue] = useState(""); // serve para salvar o valor do ingredient/instruction que foi clicado
  const [isEditingIndexIngredients, setIsEditingIndexIngredients] =
    useState(null); // serve para salvar o index do ingredient que foi clicado
  const [isEditingIndexInstructions, setIsEditingIndexInstructions] =
    useState(null); // serve para salvar o index do instruction que foi clicado

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
      setEditingRecipeId(recipe.id);
      setIsEditable(false); // Quando há uma receita, estamos editando.
    } else {
      setIsEditable(true); // Quando não há receita, estamos criando uma nova.
    }
  }, [recipe]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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

  // A função abaixo é chamada para confimar o envio do input
  function addNewIngredient() {
    if (isEditable && !addIngredients.length) {
      alert("Adicione um ingrediente");
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: [...prevFormData.ingredients, addIngredients], // Adiciona o novo ingrediente ao array
    }));
    setAddIngredients("");
    console.log(formData);
  }

  // A função abaixo é chamada para confimar o envio do input
  function addNewInstructions() {
    if (isEditable && !addInstrucitons.length) {
      // addInstrucitons.length retorna o numero de de elementos se ele estiver vazio ele retorno, 0/false, o operador ! inverte o valor e retorna true.
      alert("Adicione o modo de preparo");
      return;
    }
    setFormData((prevFormData) => ({
      ...prevFormData,
      instructions: [...prevFormData.instructions, addInstrucitons], // Adiciona o novo ingrediente ao array
    }));
    setAddInstructions("");
    console.log(formData);
  }

  function handleKeyPressIngredients(e) {
    if (e.key === "Enter" && e.target === document.activeElement) {
      addNewIngredient();
      e.preventDefault();
    }
  }

  function handleKeyPressInstrucitons(e) {
    if (e.key === "Enter" && e.target === document.activeElement) {
      addNewInstructions();
      e.preventDefault();
    }
  }

  function handleEditIngredient(index, ingredient) {
    setIsEditingValue(ingredient);
    setIsEditingIndexIngredients(index);
  }

  function handleEditInstruction(index, instructions) {
    setIsEditingValue(instructions);
    setIsEditingIndexInstructions(index);
  }

  function confirmEditValueIngredient(index) {
    const updatedIngredient = [...formData.ingredients];
    updatedIngredient[index] = isEditingValue;
    setFormData({
      ...formData,
      ingredients: updatedIngredient,
    });
    setIsEditingValue("");
    setIsEditingIndexIngredients(null);
  }

  function confirmEditValueInstruction(index) {
    const updatedInstruction = [...formData.instructions];
    updatedInstruction[index] = isEditingValue;
    setFormData({
      ...formData,
      instructions: updatedInstruction,
    });
    setIsEditingValue("");
    setIsEditingIndexInstructions(null);
  }

  function cancelEdit() {
    setIsEditingIndexInstructions(null);
    setIsEditingIndexIngredients(null);
  }

  function handleDeleteInstruction(index) {
    const delectedInstruction = formData.instructions.filter(
      (instruction, i) => i !== index
    );

    setFormData({
      ...formData,
      instructions: delectedInstruction,
    });
  }

  function handleDeleteIngredient(index) {
    const delectedIngredients = formData.ingredients.filter(
      (ingredient, i) => i !== index
    );

    setFormData({
      ...formData,
      ingredients: delectedIngredients,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addRecipe(formData);

    console.log("nova receita:", formData);
    setFormData({
      id: "",
      name: "",
      category: "",
      time: "",
      ingredients: [""],
      instructions: [""],
    });
    closeModalFormRecipe();
    handleModalSuccess();
  }

  async function handleEditRecipe(e) {
    e.preventDefault();

    if (!editingRecipeId || !formData) {
      console.error("ID de receita ou dados do formulário ausentes.");
      return;
    }

    try {
      // Atualize apenas os campos que estão em `formData`
      const recipeRef = await updateDoc(
        doc(db, "recipes", editingRecipeId),
        formData
      );
      console.log("Documento atualizado com sucesso!", recipeRef);
    } catch (error) {
      console.error("Erro ao atualizar a receita:", error);
    }

    setEditingRecipeId(null);
    closeModalFormRecipe();
    handleModalSuccess();
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
          <h2 className=" font-bold text-orange-500 text-xl">
            {!isEditable ? "Editar" : "Nova"} receita
          </h2>

          <IoClose
            onClick={closeModalFormRecipe}
            className="flex w-7 h-7 cursor-pointer"
          />
        </div>
        <form
          onSubmit={!isEditable ? handleEditRecipe : handleSubmit}
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
                name="ingredients"
                type="text"
                placeholder="Ingrediente"
                className=" w-full px-3 py-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                onChange={handleInputIngredients}
                onKeyUp={handleKeyPressIngredients}
                value={addIngredients}
              />
              <button type="button" onClick={addNewIngredient}>
                <CiCirclePlus size={30} />
              </button>
            </div>
            <div className="flex flex-col gap-1 ">
              {formData.ingredients.length > 0 &&
                formData.ingredients.map((ingredient, index) => {
                  return (
                    <div
                      onMouseEnter={() => setIsHoveredIngredient(index)}
                      onMouseLeave={() => setIsHoveredIngredient(null)}
                      className="flex flex-row items-center justify-between gap-2 w-full px-3 py-2 border rounded-md border-gray-300"
                      key={index}
                    >
                      {isEditingIndexIngredients === index ? (
                        <div className="flex justify-between w-full">
                          <input
                            type="text"
                            value={isEditingValue}
                            onChange={(e) => setIsEditingValue(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                          <div className="flex items-center gap-1 ml-1">
                            <IoClose
                              onClick={cancelEdit}
                              size={24}
                              className="text-red-800 cursor-pointer"
                            />
                            <FaCheck
                              onClick={() => confirmEditValueIngredient(index)}
                              size={22}
                              className="text-green-800 cursor-pointer"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between w-full">
                          <p className="w-full">{ingredient}</p>
                          {isHoveredIngredient === index && (
                            <div className="flex items-center gap-2">
                              <BiEditAlt
                                onClick={() =>
                                  handleEditIngredient(index, ingredient)
                                }
                                size={22}
                                className="text-gray-500 cursor-pointer"
                              />
                              <MdDeleteOutline
                                onClick={() => handleDeleteIngredient(index)}
                                size={22}
                                className="text-red-500 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
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
                name="instructions"
                type="text"
                placeholder="Passo a passo da receita"
                className="w-full px-3 py-2 border mb-1 border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
                onChange={handleInputInstructions}
                onKeyUp={handleKeyPressInstrucitons}
                value={addInstrucitons}
              />
              <button type="button" onClick={addNewInstructions}>
                <CiCirclePlus size={30} />
              </button>
            </div>
            <div className="flex flex-col gap-1 ">
              {formData.instructions.length > 0 &&
                formData.instructions.map((instruction, index) => {
                  return (
                    <div
                      onMouseEnter={() => setIsHoveredInstructions(index)}
                      onMouseLeave={() => setIsHoveredInstructions(null)}
                      className=" flex flex-row items-center justify-between gap-2 w-full px-3 py-2 border rounded-md border-gray-300"
                      key={index}
                    >
                      {isEditingIndexInstructions === index ? (
                        <div className="flex justify-between w-full">
                          <input
                            type="text"
                            value={isEditingValue}
                            onChange={(e) => setIsEditingValue(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded-md"
                          />
                          <div className="flex items-center gap-1 ml-1">
                            <IoClose
                              onClick={cancelEdit}
                              size={24}
                              className="text-red-800 cursor-pointer"
                            />
                            <FaCheck
                              onClick={() => confirmEditValueInstruction(index)}
                              size={22}
                              className="text-green-800 cursor-pointer"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-between w-full">
                          <p className="w-full">{instruction}</p>
                          {isHoveredInstructions === index && (
                            <div className="flex items-center gap-2">
                              <BiEditAlt
                                onClick={() =>
                                  handleEditInstruction(index, instruction)
                                }
                                size={22}
                                className="text-gray-500 cursor-pointer"
                              />
                              <MdDeleteOutline
                                onClick={() => {
                                  handleDeleteInstruction(index);
                                }}
                                size={22}
                                className="text-red-500 cursor-pointer"
                              />
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="w-full mb-2 flex flex-col">
            <label className="text-gray-700 font-bold">Anexar Imagem:</label>
            <input
              name="img"
              type="text"
              placeholder="Adicione a URL de uma imagem"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
              value={formData.img}
              onChange={handleInputChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600 transition duration-300"
          >
            {!isEditable ? "Editar" : "Enviar"} Receita
          </button>
        </form>
      </div>
    </div>
  );
}
