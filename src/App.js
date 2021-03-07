//* Es como un context api, para que toda la aplicacion pueda usar las caracteristicas de apollo
import { ApolloProvider } from "@apollo/client";
import { useEffect, useMemo, useState } from 'react';
import { ToastContainer } from "react-toastify";
import client from './config/apollo';
import AuthContext from "./context/AuthContext";
import Auth from './pages/Auth';
import Navigation from "./routes/Navigation";
import { decodeToken, getToken } from "./utils/token";


export default function App() {
  const [auth, setAuth] = useState( undefined );

  useEffect(() => {
    const token = getToken();
    if(!token){
      setAuth(null);
    }else{
      setAuth(decodeToken(token));
    }
    
  }, []);

  const logout = ()=>{
    console.log("Cerrar sesion.")
  };

  const setUser = (user)=>{
    setAuth(user);
  }

  const authData = useMemo(
    () => ({
    auth,
    logout,
    setUser
  }),
   [auth]);
   

   if(auth === undefined) return null;

  return (
    <ApolloProvider client={ client }>
      <AuthContext.Provider value={ authData }>
      {  !auth ? <Auth/>: <Navigation /> }

      <ToastContainer 
      position="top-right"
      autoClose={ 5000 }
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={ false }
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}
