"use client";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context";
import { useRouter } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../configFirebase";
import Menssage from "../components/Menssage";
import { MdDeleteOutline } from "react-icons/md";
import DeletModal from "../components/DeletModal";

export default function ProfileUser() {
  const router = useRouter();
  const { userProfile, userSession } = useContext(UserContext);
  const [openModalDelet, setOpenModalDelet] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "",
    lastname: "",
    email: "",
  });
  const [messageConfirmEditProfile, setMessageConfirmEditProfile] =
    useState(false);

  useEffect(() => {
    if (userProfile) {
      setProfileData({
        username: userProfile.username || "",
        lastname: userProfile.lastname || "",
        email: userProfile.email || "",
      });
    }
  }, [userProfile]);

  function handleBackPage() {
    router.back();
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("chamando");
    if (!profileData) {
      console.error("Dados do perfil ausentes.");
      return;
    }
    try {
      // Atualize apenas os campos que estão em `profileData`
      const idUser = userSession;
      console.log("idUser", idUser);
      const userRef = await updateDoc(doc(db, "users", idUser), profileData);

      setMessageConfirmEditProfile(true);
      console.log(
        "Documento atualizado com sucesso!",
        messageConfirmEditProfile
      );
      setTimeout(() => {
        setMessageConfirmEditProfile(false);
      }, 5000);
    } catch (error) {
      console.error("Erro ao atualizar o perfil:", error);
    }
  }
  function handleDeletUser() {
    setOpenModalDelet(true);
  }
  function closeModalDelet() {
    setOpenModalDelet(false);
  }
  return (
    <>
      {messageConfirmEditProfile && (
        <Menssage
          message={"Perfil atualizado com sucesso"}
          description={""}
          open={messageConfirmEditProfile}
          setOpen={setMessageConfirmEditProfile}
        />
      )}
      <div
        style={{
          minHeight: "calc(100vh - 64px)",
        }}
        className="flex flex-col items-center justify-center max-w-screen-md m-auto"
      >
        <div className="flex flex-col font-[family-name:var(--font-geist-sans)] w-2/3">
          <div
            className="flex flex-row cursor-pointer mb-6 hover:text-orange-600 group max-w-screen-md"
            onClick={() => handleBackPage()}
          >
            <IoMdArrowBack className=" w-6 h-6 text-black group-hover:text-orange-600" />
            <span className="pl-2 text-black group-hover:text-orange-600">
              Voltar
            </span>
          </div>

          <div className=" flex flex-col shadow-lg rounded-lg p-6 w-full max-w-screen-md">
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <label className=" text-gray-700 font-semibold mb-2">Nome</label>
              <input
                type="text"
                name="username"
                placeholder="Digite seu nome"
                className=" px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                value={profileData.username}
                onChange={handleInputChange}
              ></input>
              <label className=" text-gray-700 font-semibold mb-2">
                Sobrenome
              </label>
              <input
                type="text"
                name="lastname"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                value={profileData.lastname}
                onChange={handleInputChange}
              ></input>
              <label className=" text-gray-700 font-semibold mb-2">
                E-mail
              </label>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-orange-400 focus:outline-none"
                value={profileData.email}
                onChange={handleInputChange}
              ></input>
              <div className="flex w-full justify-center mt-7">
                <button
                  type="submit"
                  className="w-1/4 bg-orange-500 text-white font-bold py-2 rounded-md hover:bg-orange-600"
                >
                  Salvar
                </button>
              </div>
              <div
                className="flex flex-row items-center mt-2 text-sm p-1 h-min gap-1 border-b border-orange-600 rounded-md w-max cursor-pointer group  hover:bg-orange-600 group"
                onClick={handleDeletUser}
              >
                <MdDeleteOutline className=" w-4 h-4  cursor-pointer text-orange-600 group-hover:text-white" />
                <span className="text-orange-600 group-hover:text-white">
                  Deletar minha conta
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      {openModalDelet && (
        <DeletModal closeModalDelet={closeModalDelet} user={userSession} />
      )}
    </>
  );
}
