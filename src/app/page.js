'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login (){

    const [isNewLogin, setIsNewLogin] = useState(false)

    



    function handleSubmit(){
      
    }

    function newAcount(){
        setIsNewLogin(true)
    }
    function LogOn(){
        setIsNewLogin(false)
    }

    return(

         
            <div className="flex flex-col items-center justify-center min-h-screen gap-10">
            <h1 className="font-semibold text-4xl text-orange-600">Seja bem-vindo(a)!</h1>
                
              {(!isNewLogin) ?   
                (<div className="p-6 flex flex-col items-center border border-orange-500 shadow-lg rounded-lg bg-white w-full max-w-sm">
                    <p className="text-lg font-medium text-gray-700 mb-6">Faça seu login</p>
                    <form className="w-full flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                        <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Senha</label>
                        <input
                        type="password"
                        placeholder="Digite sua senha"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                    >
                        Entrar
                    </button>

                    <div className="text-center text-gray-600 mt-4">
                        <p>Não possui conta?</p>
                        <a onClick={newAcount}  className="text-orange-500 hover:underline cursor-pointer">Cadastrar-se</a>
                    </div>
                    </form>
                </div>
            ) : (
                    <div className="p-6 flex flex-col items-center border border-orange-500 shadow-lg rounded-lg bg-white w-full max-w-sm">
                    <p className="text-lg font-medium text-gray-700 mb-6">Faça seu cadastro</p>
                    <form className="w-full flex flex-col gap-4">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Nome</label>
                        <input
                          type="Name"
                          placeholder="Digite seu nome"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Sobrenome</label>
                        <input
                          type="Lastname"
                          placeholder="Digite seu sobrenome"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                        <input
                          type="email"
                          placeholder="Digite seu e-mail"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        />
                      </div>
                
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">Digite sua senha</label>
                        <input
                          type="password"
                          placeholder="Senha"
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        />
                      </div>
                
                      <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                      >
                        Cadastrar e entrar
                      </button>
                      <div className="text-center text-gray-600 mt-1">
                        <a onClick={LogOn}  className="text-orange-500 hover:underline cursor-pointer">Já tenho conta!</a>
                    </div>
                    </form>
                  </div>)}

        



  
                
        </div>

    )
}