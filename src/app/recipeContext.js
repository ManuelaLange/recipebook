"use client";

import { createContext, useState, useContext, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { db } from "./configFirebase";
import { UserContext } from "./context";
import { v4 as uuidv4 } from "uuid";

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
  const { userSession, userProfile } = useContext(UserContext);
  const [recipes, setRecipes] = useState([]);
  const [recipesUser, setRecipeUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserRecipes = async () => {
    try {
      const recipesCollectionUser = query(
        collection(db, "recipes"),
        where("user_id", "==", userSession)
      );
      const querySnapshot = await getDocs(recipesCollectionUser);
      const userRecipes = querySnapshot.docs.map((doc) => doc.data());
      setLoading(false);

      setRecipeUser(userRecipes);
      console.log("receitas do usuário", userRecipes);
    } catch (e) {
      console.error("Erro ao buscar as receitas ", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userSession) {
      fetchUserRecipes();
    }
  }, [userSession]);

  const fetchRecipes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "recipes"));

      const allRecipes = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setLoading(false);

      setRecipes(allRecipes);
    } catch (e) {
      console.error("Erro ao buscar as receitas ", e);
    } finally {
      setLoading(false);
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
    const pageName = name.toLowerCase().replace(/\s+/g, "-");
    const categoryValue = category.toLowerCase().replace(/\s+/g, "-");
    const user_name = userProfile.username || "Anônimo";

    const newRecipe = {
      id: uuidv4(),
      user_id: userSession,
      userName: user_name,
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
      const docRef = await setDoc(doc(db, "recipes", newRecipe.id), newRecipe);
      console.log("Document written with ID: ", newRecipe.id);
      setRecipeUser((prevRecipes) => [...prevRecipes, newRecipe]);
      setRecipes((prevRecipes) => [...prevRecipes, newRecipe]);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        addRecipe,
        recipesUser,
        setRecipeUser,
        loading,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};
export { RecipeProvider, RecipeContext };
