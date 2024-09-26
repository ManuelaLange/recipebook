export default function Form(){

    return(
        <div className="flex flex-col max-w-screen-lg items-center font-[family-name:var(--font-geist-sans)]">
            <h3>Nova receita</h3>
            <form className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg max-w-screen-lg mx-auto">
  <div className="w-full mb-4">
    <label className="block text-gray-700 font-bold mb-2">Nome da receita</label>
    <input type="text" placeholder="Nome" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500" />
  </div>

  <div className="w-full mb-4">
    <label className="block text-gray-700 font-bold mb-2">Categoria</label>
    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500">
      <option value="">Selecione a categoria</option>
      <option value="Sobremesa">Sobremesa</option>
      <option value="Principal">Prato Principal</option>
      <option value="Entrada">Entrada</option>
    </select>
  </div>

  <div className="w-full mb-4">
    <label className="block text-gray-700 font-bold mb-2">Tempo de preparo</label>
    <input type="text" placeholder="Ex: 45min" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500" />
  </div>

  <div className="w-full mb-4">
    <label className="block text-gray-700 font-bold mb-2">Ingredientes</label>
    <input type="text" placeholder="Ingrediente" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500" />
  </div>

  <div className="w-full mb-4">
    <label className="block text-gray-700 font-bold mb-2">Modo de preparo</label>
    <input type="text" placeholder="Passo a passo da receita" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-500" />
  </div>

  <button type="submit" className="w-full bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600 transition duration-300">
    Enviar Receita
  </button>
</form>


        </div>
    )
}