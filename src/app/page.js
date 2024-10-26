"use client";

import { useRouter } from "next/navigation";
import { useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { auth, db } from "./configFirebase";
import { UserContext } from "./context";

export default function Login() {
  const [isNewLogin, setIsNewLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userSession, setUserSession } = useContext(UserContext);
  const router = useRouter();
  const [name, SetName] = useState("");
  const [lastname, SetLastname] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("uid");
    if (accessToken) {
      router.push(`/home/123`);
    } else {
      router.push(`/`);
    }
  }, [router]);

  async function signInUser(e, email, password) {
    e.preventDefault();
    if (!email || !password) {
      console.error("Todos os campos são obrigatórios.");
      return; // Interrompe a função se houver algum campo vazio
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserSession(userCredential);
      localStorage.setItem("uid", userCredential.user.uid);

      console.log("user", userCredential);
      router.push(`/home/123`);
      setEmail("");
      setPassword("");
    } catch (err) {
      console.log(err);
    }
  }

  // Storage.get userSession

  // if existir
  //   firebaseConfig.validateSession(userSession)
  // else
  //   login

  async function signUpUser(e, email, password) {
    console.log("dsadas");
    e.preventDefault();

    if (!email || !password || !lastname || !name) {
      console.error("Todos os campos são obrigatórios.");
      return; // Interrompe a função se houver algum campo vazio
    }

    try {
      // Cria um novo usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("novo Usuário", userCredential);

      try {
        addDoc(collection(db, "/users", userCredential.user.uid), {
          id: userCredential.user.uid,
          username: name,
          email: email,
          password: password,
        });
        console.log("Document written with ID: ", db.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
      localStorage.setItem("uid", userCredential.user.uid);
      router.push(`/home/123`);

      // Aqui você pode redirecionar o usuário para uma página de sucesso ou perfil, etc.
    } catch (error) {
      console.log("Erro ao registrar usuário:", error);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-10">
      <h1 className="font-semibold text-4xl text-orange-600">
        Seja bem-vindo(a)!
      </h1>

      {!isNewLogin ? (
        <div className="p-6 flex flex-col items-center border border-orange-500 shadow-lg rounded-lg bg-white w-full max-w-sm">
          <p className="text-lg font-medium text-gray-700 mb-6">
            Faça seu login
          </p>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => signInUser(e, email, password)}
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Senha
              </label>
              <input
                type="password"
                value={password}
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
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
              <a
                onClick={() => setIsNewLogin(true) && setEmail("")}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Cadastrar-se
              </a>
            </div>
          </form>
        </div>
      ) : (
        <div className="p-6 flex flex-col items-center border border-orange-500 shadow-lg rounded-lg bg-white w-full max-w-sm">
          <p className="text-lg font-medium text-gray-700 mb-6">
            Faça seu cadastro
          </p>
          <form
            className="w-full flex flex-col gap-4"
            onSubmit={(e) => signUpUser(e, email, password, name, lastname)}
          >
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Nome
              </label>
              <input
                type="Name"
                value={name}
                onChange={(e) => SetName(e.target.value)}
                placeholder="Digite seu nome"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Sobrenome
              </label>
              <input
                type="Lastname"
                value={lastname}
                onChange={(e) => SetLastname(e.target.value)}
                placeholder="Digite seu sobrenome"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Digite sua senha
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <a
                onClick={() => setIsNewLogin(false)}
                className="text-orange-500 hover:underline cursor-pointer"
              >
                Já tenho conta!
              </a>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

{
  /* <div>
<label className="block text-gray-700 font-semibold mb-2">
  Nome
</label>
<input
  type="Name"
  value={name}
  onChange={(e) => SetName(e.target.value)}
  placeholder="Digite seu nome"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
/>
</div>
<div>
<label className="block text-gray-700 font-semibold mb-2">
  Sobrenome
</label>
<input
  type="Lastname"
  value={lastname}
  onChange={(e) => SetLastname(e.target.value)}
  placeholder="Digite seu sobrenome"
  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400 focus:outline-none"
/>
</div> */
}
