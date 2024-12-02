"use client";
import { useRouter } from "next/navigation";
import { CategoryContext } from "../categoryContext";
import { useContext, useRef, useEffect } from "react";
import { FaBook, FaRegUser } from "react-icons/fa";
// import { GoChevronDown } from "react-icons/go";
import { IoLogOutOutline } from "react-icons/io5";
// import { RecipeContext } from "../recipeContext";
import { SearchContext, UserContext } from "../context";

export default function Header() {
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const divRef = useRef(null);
  const router = useRouter();
  const { categoryRecipes } = useContext(CategoryContext);
  // const { recipes } = useContext(RecipeContext);
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
    <header className="h-16 bg-orange-100 flex items-center justify-between">
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

      <div className="flex items-center mx-6 gap-2">
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
        <div className="flex flex-row gap-2 border-r-2 p-2">
          {!userProfile ? (
            <p className="text-orange-500">(sem nome)</p>
          ) : (
            <p className="text-orange-500">{userProfile.username}</p>
          )}

          <FaRegUser
            onClick={() => router.push("/profileUser")}
            className="hover:text-orange-600 cursor-pointer"
            size={22}
            style={{ color: "#f97316" }}
          />
        </div>
        <IoLogOutOutline
          onClick={handleLogout}
          className="hover:text-orange-600 cursor-pointer"
          size={24}
          style={{ color: "#f97316" }}
        />
      </div>
    </header>
  );
}
