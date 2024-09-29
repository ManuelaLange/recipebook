"use client";

import Image from "next/image";
import { CategoryContext } from "../categoryContext";
import { useContext, useState } from "react";

export default function Header() {
  const [isDropdownMenuOpen, setIsDropdownOpen] = useState(false);

  function toggleDropdown() {
    setIsDropdownOpen((prevState) => !prevState);
  }

  const { categoryRecipes } = useContext(CategoryContext);
  return (
    <header className="bg-orange-50 flex items-center justify-between">
      <div className="flex items-center space-x-6 mx-6">
        <Image alt="Logo" className="w-14 h-14" />

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
                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div
                    className="py-1"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {categoryRecipes.slice(6).map((category) => {
                        return (
                          <li
                            key={category}
                            className="hover:text-orange-600 cursor-pointer"
                          >
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
          {/* <div className="relative inline-block text-left">
            <button
              onClick={toggleDropdown}
              className="inline-flex justify-center w-full rounded-md  text-sm font-medium text-orange-500 font-semibold hover:text-orange-600 cursor-pointer"
            >
              Mais
            </button>
            {isDropdownMenuOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Frutas
                  </a>
                </div>
              </div>
            )}
          </div> */}
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
