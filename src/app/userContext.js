// "use client";

// import { createContext, useState, useEffect } from "react";
// import { auth } from "./configFirebase"; // Certifique-se de importar a configuração correta do Firebase

// const UserContext = createContext();

// const UserProvider = ({ children }) => {
//   const [userSession, setUserSession] = useState(null);

//   useEffect(() => {
//     // Observar mudanças no status de autenticação
//     const unsubscribe = auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         // Usuário logado, armazenar o uid
//         setUserSession(auth.userCredencial.user.uid);
//         console.log(auth.userCredencial.user.uid);
//       } else {
//         // Usuário deslogado, limpar o estado
//         setUserSession(null);
//       }
//     });

//     // Limpar o observador ao desmontar o componente
//     return () => unsubscribe();
//   }, []);

//   return (
//     <UserContext.Provider value={{ userSession, setUserSession }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
// export { UserProvider, UserContext };
