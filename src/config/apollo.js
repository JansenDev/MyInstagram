import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

//* Crear un link de tipo HttpLink
const httplik = createHttpLink({
    uri:"http://localhost:4000",
});

const client = new ApolloClient({
    //* Activar la extension de chrome apollo client developer
    connectToDevTools:true,
    //* Activar el uso de la memoria caché
    cache: new InMemoryCache(),
    //* Direccion del apollo server
    link: httplik
});

export default client;