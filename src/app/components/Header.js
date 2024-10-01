"use client";

import { CategoryContext } from "../categoryContext";
import { useContext, useState } from "react";
import { GiBookshelf } from "react-icons/gi";

export default function Header() {
  const [isDropdownMenuOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen((prevState) => !prevState);
  }

  const { categoryRecipes } = useContext(CategoryContext);
  return (
    <header className="h-12 bg-orange-50 flex items-center justify-between">
      <div className="flex items-center space-x-6 mx-6">
        <GiBookshelf size={24} color="bg-orange-50" />

        <ul className="flex space-x-6 text-orange-500 font-semibold">
          {categoryRecipes.slice(0, 5).map((category) => {
            return (
              <li
                key={category}
                className="hover:text-orange-600 cursor-pointer"
              >
                {category}
              </li>
            );
          })}
          {categoryRecipes.length > 5 && (
            <div className="relative inline-block text-left">
              <button
                onClick={toggleDropdown}
                className="inline-flex justify-center w-full rounded-md  text-sm font-medium text-orange-500 font-semibold hover:text-orange-600 cursor-pointer"
              >
                Mais
              </button>
              {isDropdownMenuOpen && (
                <div className="origin-top-right absolute right-50 mt-2 w-44 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-orange-600 hover:text-orange-700"
                    >
                      {categoryRecipes.slice(6).map((category) => {
                        return (
                          <li key={category} className="cursor-pointer">
                            {category}
                          </li>
                        );
                      })}
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
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
