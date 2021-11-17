import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ARTS } from '../utils/queries';

import Auth from '../utils/auth';

import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';

import ArtCarousel from '../components/ArtCarousel';
import ArtSearch from '../components/ArtSearch';

import background from '../image/creamBrick.jpg';

const contentStyles = makeStyles((theme) => ({
  artSearchContainer: {
    backgroundImage: `url(${background})`,
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 170px)',
    },
  },
  artSearchStyle: {
    color: 'black !important',
  },
}));

const Explore = () => {
  const { artSearchContainer, artSearchStyle } = contentStyles();

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
      {loading ? <div>Loading...</div> : <div style={{width: '100%'}}><ArtCarousel art={carouselArt} /></div>}
      <Grid container className={artSearchContainer}>
        <Grid className={artSearchStyle}>
          <br />
          <ArtSearch />
        </Grid>
      </Grid>
    </>
  );
};

export default Explore;
