// "use client";

// import { createContext, useState, useEffect } from "react";
// import { auth, db } from "./firebaseConfig"; // Certifique-se de importar a configuração correta do Firebase
// import { doc, getDoc } from "firebase/firestore";

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [userSession, setUserSession] = useState({});

// useEffect (() => {
//   const unsubscribe = auth.onAuthStateChanged(async (user)=> {
//     if (user){
//       const uid=user.uid
//       const userDocRef = doc(db,"users", uid)
//       const userDoc = await getDoc(userDocRef)
//       if(userDoc.exists()){
//         setUserSession({
//           uid:user.uid,...userDoc.data(),
//         })
//       }
//       else{
//         console.error("Documento do usuário não encontrado")
//       }
//     }
//    else
//    { setUserSession(null)}
    
  
// })
// return()=> unsubscribe
// }, [])


//   return (
//     <UserContext.Provider value={{ userSession, setUserSession }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// export { UserProvider, UserContext }
