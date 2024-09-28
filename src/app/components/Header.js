import Image from "next/image";

export default function Header() {
  return (
    <header className="bg-orange-50 flex items-center justify-between">
      <div className="flex items-center space-x-6 mx-6">
        <Image alt="Logo" className="w-14 h-14" />

        <ul className="flex space-x-6 text-orange-500 font-semibold">
          <li className="hover:text-orange-600 cursor-pointer">Carne</li>
          <li className="hover:text-orange-600 cursor-pointer">Sobremesa</li>
          <li className="hover:text-orange-600 cursor-pointer">Massas</li>
          <li className="hover:text-orange-600 cursor-pointer">Bolos</li>
          <li className="hover:text-orange-600 cursor-pointer">Bebidas</li>
          <li className="hover:text-orange-600 cursor-pointer">Sopas</li>
        </ul>
      </div>

      <div className="flex items-center mx-6 gap-2">
        <input
          type="text"
          placeholder="Buscar..."
          className="px-4 py-1 border rounded-lg text-gray-600"
        />
        <button className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-400">
          Pesquisar
        </button>
      </div>
    </header>
  );
}
