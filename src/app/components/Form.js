export default function Form() {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <form className="w-full md:w-1/2 lg:w-1/3 mx-auto flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg font-[family-name:var(--font-geist-sans)]">
        <h2 className="pb-5 font-bold  text-orange-500 text-xl">
          Nova receita
        </h2>
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
            <option value="Sobremesa">Carnes</option>
            <option value="Principal">Massas</option>
            <option value="Entrada">Sopas</option>
            <option value="Entrada">Bebidas</option>
            <option value="Entrada">Bolos</option>
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
  );
}
