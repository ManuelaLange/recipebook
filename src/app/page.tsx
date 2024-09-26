import bolodemilho from "../../img/bolodemilho.jpg";
import cookie from "../../img/cookie.jpg";
import strogonof from "../../img/strogonof.jpg";
import yakisoba from "../../img/yakisoba.jpeg";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="bg-gray-100 flex items-center justify-between p-4">
        <div className="flex items-center space-x-6 mx-6">
          <img src="/logo.png" alt="Logo" className="w-16 h-16" />

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
            className="px-4 py-2 border rounded-lg text-gray-600"
          />
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
            Pesquisar
          </button>
        </div>
      </header>
      <div className="flex flex-col justify-items-center py-24 font-[family-name:var(--font-geist-sans)]">
        <main className="mx-auto">Minhas receitas</main>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-auto max-w-screen-lg ">
        <div className="flex flex-col gap-2 items-center border border-orange-500 p-4 rounded-lg">
          <Image
            src={bolodemilho}
            alt="Ícone 1"
            className="w-18 h-18 rounded-lg"
          />
          <p>Bolo de milho</p>

          <button className="bg-orange-400 rounded-lg p-2 text-white">
            Acessar Receita{" "}
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center border border-orange-500 p-4 rounded-lg ">
          <Image src={cookie} alt="Ícone 2" className="w-18 h-18 rounded-lg" />
          <p>Cookie</p>

          <button className="bg-orange-400 rounded-lg p-2 text-white">
            Acessar Receita{" "}
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center border border-orange-500 p-4 rounded-lg">
          <Image
            src={strogonof}
            alt="Ícone 3"
            className="w-18 h-18 rounded-lg"
          />
          <p>Strogonoff</p>

          <button className="bg-orange-400 rounded-lg p-2 text-white">
            Acessar Receita{" "}
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center border border-orange-500 p-4 rounded-lg">
          <Image
            src={yakisoba}
            alt="Ícone 4"
            className="w-18 h-18 rounded-lg"
          />
          <p className="">Yakisoba</p>

          <button className="bg-orange-400 rounded-lg p-2 text-white">
            Acessar Receita{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
