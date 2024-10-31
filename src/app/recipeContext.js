"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { collection, getDocs, addDoc, getDoc } from "firebase/firestore";
import { db } from "./configFirebase";
import { UserContext } from "./context";
import { v4 } from 'uuid';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const { userSession } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const uid = userSession;

  const fetchUserRecipes = async () => {
    try {
      const recipesCollectionRef = collection(db, "users", uid, "recipes");
      const querySnapshot = await getDocs(recipesCollectionRef);
      const userRecipes = querySnapshot.docs.map((doc) => doc.data());
      setRecipes(userRecipes);
      console.log(userRecipes);
    } catch (e) {
      console.error("Erro ao buscar as receitas ", e);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchUserRecipes();
    }
    return;
  }, [userSession]);

  async function addRecipe({
    name,
    category,
    time,
    ingredients,
    instructions,
    img,
  }) {
    const pageName = name.toLowerCase().replace(/\s+/g, "-"); // converte o nome para um formato URL-friendly
    const categoryValue = category.toLowerCase().replace(/\s+/g, "-"); // transforma a categoria em lowercase para fins de consistência
    const newRecipe = {
      id: v4(),
      user_id: userSession,
      category,
      categoryValue,
      ingredients,
      instructions,
      name,
      pageName,
      time,
      img,
    };
    try {
      const docRef = await addDoc(collection(db, "recipes"), newRecipe);
      console.log("Document written with ID: ", docRef);
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async function editedRecipes() {
    const colRef = doc(db, "users", userSession, "recipes");

    recipes.map((rec) =>
      rec.id === editingRecipeId ? { ...rec, ...formData } : rec
    );
  }

  return (
    <RecipeContext.Provider
      value={{ recipes, setRecipes, addRecipe, editedRecipes }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
