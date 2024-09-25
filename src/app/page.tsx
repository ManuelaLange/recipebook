import bolodemilho from "../../img/bolodemilho.jpg";
import cookie from "../../img/cookie.jpg";
import strogonof from "../../img/strogonof.jpg";
import yakisoba from "../../img/yakisoba.jpeg";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="font-[family-name:var(--font-geist-sans) flex gap-3">
        <img alt="Logo" />
        <ul className=" flex flex-rows gap-2">
          <li>Adicionar nova receita</li>
          <li>Minhas receitas</li>
        </ul>
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
          <p>Café </p>
          <button className="bg-orange-400 rounded-lg p-2 text-white">
            Acessar Receita{" "}
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center border border-orange-500 p-4 rounded-lg ">
          <Image src={cookie} alt="Ícone 2" className="w-18 h-18 rounded-lg" />
          <p>Cookie</p>
          <p>Café </p>
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
          <p>Almoço</p>
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
          <p>Janta</p>
          <button className="bg-orange-400 rounded-lg p-2 text-white">
            Acessar Receita{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
