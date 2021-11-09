import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Art from './pages/Art';
import ArtInArea from './pages/ArtInArea';
import Artist from './pages/Artist';
import FavoriteArt from './pages/FavoriteArt';
import FavoriteArtist from './pages/FavoriteArtist';
import Footer from './components/Footer';
import Header from './Components/Header';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Profile from './pages/Profile';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Route exact path="/">
          <Home />
        </Route>

        <Route exact path="/loginSignup">
          <LoginSignup />
        </Route>

        <Route exact path="/art/:id">
          <Art />
        </Route>

        <Route exact path="/artInArea/:location">
          <ArtInArea />
        </Route>

        <Route exact path="/artist/:id">
          <Artist />
        </Route>

        <Route exact path="/favoriteArt/:username">
          <FavoriteArt />
        </Route>

        <Route exact path="/favoriteArtist/:username">
          <FavoriteArtist />
        </Route>

        <Route exact path="/profile/:username">
          <Profile />
        </Route>

        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
