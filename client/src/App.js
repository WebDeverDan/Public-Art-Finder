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
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';

import './global.css';

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

const contentStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '150px',
    minHeight: 'calc(100vh - 288px)',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 250px)',
    },
  },
}));

function App() {
  const { content } = contentStyles();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Grid container className={content}>
          <Grid>
            <Route exact path="/">
              <Home />
            </Route>

            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/signup">
              <Signup />
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

            <Route exact path="/profile/:userId">
              <Profile />
            </Route>

            <Route exact path="/me">
              <Profile />
            </Route>
          </Grid>
        </Grid>

        <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
