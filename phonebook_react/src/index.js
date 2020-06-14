import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { ApolloClient, HttpLink, InMemoryCache, gql, ApolloProvider } from '@apollo/client'

// client object sends query to server
const client = new ApolloClient({
  // cache speeds up the time to return execution of query that
  // don't rely on real-time data
  // use identifying field id of type ID to check and combine if the same object is returned
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
  })
})

/*
const query = gql`
query {
  allPersons  {
    name,
    phone,
    address {
      street,
      city
    }
    id
  }
}
`

client.query({ query })
  .then((response) => {
    console.log(response.data)
  })
*/

// wrapping in ApolloProvide element makes the whole app have access to client
ReactDOM.render(
  // note that the client object is passed in here as a prop
  <ApolloProvider client = { client }>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
