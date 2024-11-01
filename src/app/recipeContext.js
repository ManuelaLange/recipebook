"use client";

import { createContext, useState, useContext, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "./configFirebase";
import { UserContext } from "./context";
import { v4 as uuidv4 } from "uuid";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const { userSession } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [recipesUser, setRecipeUser] = useState([]);

  const fetchUserRecipes = async () => {
    try {
     
      console.log('iduser',userSession )
      const recipesCollectionUser = query(
        collection(db, "recipes"),
        where("user_id", "==", userSession)
      );
      const querySnapshot = await getDocs(recipesCollectionUser);
      const userRecipes = querySnapshot.docs.map((doc) => doc.data());
      console.log('receitas do usuário',userRecipes )

      setRecipeUser(userRecipes);
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

  const fetchRecipes = async () => {
    try {
      console.log("fetchRecipes");
      console.log("userSession", userSession);

      const querySnapshot = await getDocs(collection(db, "recipes"));
      const allRecipes = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      console.log("allRecipes", allRecipes);
      setRecipes(allRecipes);
    } catch (e) {
      console.error("Erro ao buscar as receitas ", e);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

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
      id: uuidv4(),
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
      setRecipeUser((prevRecipes) => [...prevRecipes, newRecipe]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  // async function editedRecipes() {
  //   const colRef = doc(db, "users", userSession, "recipes");

  //   recipes.map((rec) =>
  //     rec.id === editingRecipeId ? { ...rec, ...formData } : rec
  //   );
  // }

  return (
    <RecipeContext.Provider
      value={{ recipes, setRecipes, addRecipe, recipesUser, setRecipeUser }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
