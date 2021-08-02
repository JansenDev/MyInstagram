//* createHttpLink: Me permite enviar datos del cliente al servidor
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
//* Permite enviar el stream de una imagen del cliente al servidor
import { createUploadLink } from "apollo-upload-client";
//* Permite enviar el context(headers) del cliente al servidor;
import { setContext } from "apollo-link-context";
import { getToken } from "../utils/token";

//* Crear un link de tipo HttpLink
const httplink = createUploadLink({
    uri:"http://localhost:4000",
});

//*Envia el context(headers) al servidor
const authLink = setContext( (_, { headers }) => {
    const token = getToken();
    return {
        headers:{
            ...headers,
            Authorization: token? `Bearer ${ token }`: "",
        }
    };
});

const client = new ApolloClient({
    //* Activar la extension de chrome apollo client developer
    connectToDevTools:true,
    //* Activar el uso de la memoria caché
    cache: new InMemoryCache(),
    //* Direccion del apollo server
    link: authLink.concat(httplink)
});

export default client;