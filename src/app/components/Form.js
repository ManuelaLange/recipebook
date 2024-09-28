import { IoClose } from "react-icons/io5";

export default function Form({ closeModalFormRecipe, categoryRecipes }) {
  return (
    <div className=" flex-col fixed inset-0 bg-black/60 flex items-center  justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto flex flex-col items-center bg-gray-100 rounded-lg shadow-lg font-[family-name:var(--font-geist-sans)]">
        <div className="w-full flex flex-row pt-4 justify-between px-6">
          <h2 className=" font-bold text-orange-500 text-xl">Nova receita</h2>
          <IoClose
            onClick={closeModalFormRecipe}
            className="flex w-7 h-7 cursor-pointer"
          />
        </div>
        <form className="w-full mx-auto flex flex-col items-center p-6  font-[family-name:var(--font-geist-sans)]">
          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Nome da receita
            </label>
            <input
              type="text"
              placeholder="Nome"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Categoria
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500">
              <option value="">Selecione a categoria</option>
              {categoryRecipes.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
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
              type="text"
              placeholder="Ex: 45min"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Ingredientes
            </label>
            <input
              type="text"
              placeholder="Ingrediente"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="w-full mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Modo de preparo
            </label>
            <input
              type="text"
              placeholder="Passo a passo da receita"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500"
            />
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
