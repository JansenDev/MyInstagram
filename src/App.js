import { useState } from 'react'
//* Es como un context api, para que toda la aplicacion pueda usar las caracteristicas de apollo
import { ApolloProvider } from "@apollo/client";
import  client  from './config/apollo';
import { ToastContainer } from "react-toastify";
import Auth from './pages/Auth';

export default function App() {
  const [auth, setAuth] = useState( undefined );

  return (
    <ApolloProvider client={ client }>
      {  !auth ? <Auth/>: <h1>Estas logeado</h1> }

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
      
    </ApolloProvider>
  );
}
