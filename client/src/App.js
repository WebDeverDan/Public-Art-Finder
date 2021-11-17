import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddArt from './pages/AddArt';
import Art from './pages/Art';
// import Artist from './pages/Artist';
// import FavoriteArt from './pages/FavoriteArt';
// import FavoriteArtist from './pages/FavoriteArtist';
import Explore from './pages/Explore';
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
  allContent: {
    paddingTop: '64px',
    minHeight: 'calc(100vh - 130px)',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 170px)',
    },
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

function App() {
  const { allContent, content } = contentStyles();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />

        <Grid className={allContent}>
          <Route exact path="/">
            <Home />
          </Route>

          <Grid container className={content}>
            <Route exact path="/login">
              <Login />
            </Route>

            <Route exact path="/signup">
              <Signup />
            </Route>

            <Route exact path="/art/:artId">
              <Art />
            </Route>

            <Route exact path="/addArt">
              <AddArt />
            </Route>

            <Route exact path="/explore">
              <Explore />
            </Route>

            {/* <Route exact path="/artist/:id">
              <Artist />
            </Route> */}

            {/* <Route exact path="/favoriteArt/:username">
              <FavoriteArt />
            </Route> */}

            {/* <Route exact path="/favoriteArtist/:username">
              <FavoriteArtist />
            </Route> */}

            <Route exact path="/profile/:username">
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
