"use client";
import { useRouter } from "next/navigation";
import { CategoryContext } from "../categoryContext";
import { useContext, useRef, useEffect, useState } from "react";
import { FaBook, FaRegUser } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoLogOutOutline } from "react-icons/io5";
// import { RecipeContext } from "../recipeContext";
import { SearchContext, UserContext } from "../context";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef(null);
  const router = useRouter();
  const { categoryRecipes } = useContext(CategoryContext);
  const { search, setSearch } = useContext(SearchContext);
  const { userSession, userProfile, handleLogout } = useContext(UserContext);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (divRef.current && !divRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [divRef]);

  function handleFilterRecipePage({ title }) {
    router.push(`/recipefilter/${title}`);
  }

  if (!userSession) return <div className="h-12 w-full"></div>;
  return (
    <header className="h-16 bg-orange-100 flex items-center justify-between  fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center space-x-6 mx-6">
        <FaBook
          onClick={() => router.push("/home")}
          className="hover:text-orange-600 cursor-pointer"
          size={24}
          style={{ color: "#f97316" }}
        />

        <ul className="flex space-x-6 text-orange-500 font-semibold">
          {categoryRecipes.map((category) => {
            return (
              <li
                key={category.title}
                className="hover:text-orange-600 cursor-pointer"
                onClick={() => handleFilterRecipePage(category)}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </div>
      <div className="flex flex-row gap-5 ">
        <div className="flex items-center gap-2 border-r border-gray-300 pr-3">
          <input
            type="text"
            placeholder="Buscar..."
            className="px-4 py-1 border rounded-lg text-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="bg-orange-500 text-white px-4 py-1 rounded-lg hover:bg-orange-400">
            Pesquisar
          </button>
        </div>
        <div className="flex flex-row gap-2 p-2 mr-3 group">
          <DropdownMenu
            className="flex flex-row gap-2 p-2 group"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <DropdownMenuTrigger className="flex flex-row gap-2 ">
              {!userProfile ? (
                <p className="text-orange-500 cursor-pointer">(sem nome)</p>
              ) : (
                <p className="text-orange-500 cursor-pointer">
                  {userProfile.username}
                </p>
              )}
              <FaRegUser
                className="cursor-pointer"
                size={22}
                style={{ color: "#f97316" }}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-4 mr-3 w-44 text-center">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/profileUser")}>
                <FaRegUser style={{ color: "#f97316" }} />
                Meu perfil
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <IoLogOutOutline style={{ color: "#f97316" }} />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
