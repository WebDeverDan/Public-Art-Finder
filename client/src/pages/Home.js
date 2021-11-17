import React from 'react';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { QUERY_ARTS } from '../utils/queries';

import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

import ArtForm from '../components/ArtForm';
import ArtCarousel from '../components/ArtCarousel';
import ArtSearch from '../components/ArtSearch';
// import Map from '../components/Map';
import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import HeroImage from '../image/colorfulSky.jpg';
import background from '../image/creamBrick.jpg';

const contentStyles = makeStyles((theme) => ({
  artFormContainer: {
    backgroundImage: `url(${background})`,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 170px)',
    },
  },
  artFormStyle: {
    color: 'black !important',
  },
  hero: {
    height: '600px',
    backgroundImage: `url(${HeroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
    fontSize: '4rem',
    paddingBottom: '30px',
    backgroundSize: 'cover',
    textAlign: 'justify',
    textAlignLast: 'right',
  },
}));

const Home = () => {
  const { artFormContainer, artFormStyle, hero } = contentStyles();
  const { loading, data } = useQuery(QUERY_ARTS);
  const artData = data?.arts || [];

  // Filter art so only those added by other users are visible on carousel
  let username;
  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.username;
  }

  let carouselArt;
  if (username) {
    carouselArt = artData.filter((art) => {
      return art.addedBy !== username;
    });
    // If the filtered artData brings back < 5 artworks, show that user's artwork too
    if (carouselArt.length < 5) {
      carouselArt = artData;
    }
  } else {
    carouselArt = artData;
  }

  // Shuffle order of characters within array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  // If over max # of carousel images, shuffle and return correct # of random images
  const maxCarouselImgs = 10;
  if (carouselArt.length > maxCarouselImgs) {
    carouselArt = shuffleArray(carouselArt);
    carouselArt.length = maxCarouselImgs;
  }

  return (
    <>
      <Typography variant="h1" align="center" color="primary" gutterBottom>
        SHARE THE ART IN YOUR WORLD
      </Typography>
      <Box className={hero}>
        <Grid container maxWidth="md" padding="30px">
          <Typography variant="h3" color="textPrimary">
            “The purpose of art is washing the dust of daily life off our
            souls.” <br />
            ―Pablo Picasso
          </Typography>
        </Grid>
      </Box>

      {loading ? <div>Loading...</div> : <ArtCarousel art={carouselArt} />}
      <Grid container className={artFormContainer}>
        <Grid className={artFormStyle}>
          <br />
          {Auth.loggedIn() ? (
            <Link to="/addArt">
              <button type="button" style={{ backgroundColor: 'green' }}>
                Add Art +
              </button>
            </Link>
          ) : null}
          <ArtSearch />
          {/* <ArtForm /> */}
          {/* <Map /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
