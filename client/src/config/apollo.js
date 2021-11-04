import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import {createUploadLink} from "apollo-upload-client";
 
const httpLik = createUploadLink({
    uri: 'http://localhost:4000/',
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: httpLik,    
});
 
export default client;