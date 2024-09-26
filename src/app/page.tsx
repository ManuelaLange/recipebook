import bolodemilho from "../../img/bolodemilho.jpg";
import cookie from "../../img/cookie.jpg";
import strogonof from "../../img/strogonof.jpg";
import yakisoba from "../../img/yakisoba.jpeg";
import Image from "next/image";
import Form from "./components/Form"

export default function Home() {
  return (
    <div>
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
      <div className="flex flex-col items-center py-24 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <main className="mx-auto">Cadastre suas receitas</main>
        <button className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400">
            Adicionar nova receita
          </button>
      </div>
      <div className="max-w-screen-lg mx-auto mb-4 font-[family-name:var(--font-geist-sans)]">
        <h4 className="mx-auto">Adicionadas recentemente</h4>
      </div>

      <div className="grid grid-cols-4 gap-8 mx-auto mb-4 max-w-screen-lg ">
        <button className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500">
          <Image
            src={bolodemilho}
            alt="Ícone 1"
            className="w-18 h-18 rounded-lg"
          />
          <p>Bolo de milho</p>

        </button>
        <button className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500 ">
          <Image src={cookie} alt="Ícone 2" className="w-18 h-18 rounded-lg" />
          <p>Cookies</p>

        </button>
        <button className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500">
          <Image
            src={strogonof}
            alt="Ícone 3"
            className="w-18 h-18 rounded-lg"
          />
          <p>Strogonoff de frango</p>


        </button>
        <button className="flex flex-col gap-4 items-center border border-orange-500 p-4 rounded-lg font-semibold text-orange-500">
          <Image
            src={yakisoba}
            alt="Ícone 4"
            className="w-18 h-18 rounded-lg"
          />
          <p className="">Yakisoba</p>

        </button>
      </div>

      <div className="max-w-screen-lg mx-auto mb-4 font-[family-name:var(--font-geist-sans)]">
    <a className="ml-auto text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">Acessar todas</a>
      </div>

      <Form/>


      
    </div>
  );
}
