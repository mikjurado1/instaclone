import { ApolloClient, InMemoryCache } from '@apollo/client';
 
const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    uri: 'http://localhost:4000/'
});
 
export default client;