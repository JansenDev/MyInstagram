import { useState } from 'react'
//* Es como un context api, para que toda la aplicacion pueda usar las caracteristicas de apollo
import { ApolloProvider } from "@apollo/client";
import  client  from './config/apollo';
import { ToastContainer } from "react-toastify";
import { useEffect, useMemo } from "react";
import Auth from './pages/Auth';
import { getToken, setToken } from "./utils/token";
import AuthContext from "./context/AuthContext";
import Home from "./pages/Home";

export default function App() {
  const [auth, setAuth] = useState( undefined );

  useEffect(() => {
    const token = getToken();
    if(!token){
      setAuth(null);
    }else{
      setAuth(token);
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
   
  return (
    <ApolloProvider client={ client }>
      <AuthContext.Provider value={ authData }>
      {  !auth ? <Auth/>: <Home /> }

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
