"use client"
import bolodemilho from "../../img/bolodemilho.jpg";
import cookie from "../../img/cookie.jpg";
import strogonof from "../../img/strogonof.jpg";
import yakisoba from "../../img/yakisoba.jpeg";
import Image from "next/image";
import Form from "./components/Form";
import { useState } from "react";

export default function Home() {
  // const [recipes, setRecipes] = useState([
  //   {
  //     id: "1",
  //     name: "ld",
  //   },
  // ]);

  const [modalNewRecipe, SetModalNewRecipe] = useState(false)

  function NewRecipe (){
    SetModalNewRecipe(true)
    console.log("chamando")
  }

  return (
    <div>
      
      
      <div className="flex flex-col items-center py-24 font-[family-name:var(--font-geist-sans)] m-auto max-w-screen-lg">
        <main className="mx-auto">Cadastre suas receitas</main>
        <button onClick={NewRecipe} className="bg-orange-500 text-white px-4 py-2 mt-3 rounded-lg hover:bg-orange-400">
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
        <a className="ml-auto text-orange-500 underline block text-right cursor-pointer hover:text-orange-600">
          Acessar todas
        </a>
      </div>

      {modalNewRecipe && (<Form />)}
    </div>
  );
}
