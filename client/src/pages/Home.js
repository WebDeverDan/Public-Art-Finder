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

const contentStyles = makeStyles((theme) => ({
  hero: {
    height: '600px',
    backgroundImage: `url(${HeroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: '4rem',
    paddingBottom: '30px',
    backgroundSize: 'cover',
    color: 'white',
    fontWeight: 'bolder',
    textAlign: 'center',
  },
  share: {
    textShadow: '4px 4px  #000000',
    textAlign: 'right',
  },
}));

const Home = () => {
  const { artFormContainer, artFormStyle, hero, share, title } =
    contentStyles();
  // TODO: Get ~4 random artworks to pass into Carousel component
  const { loading, data } = useQuery(QUERY_ARTS);
  const artData = data?.arts || [];

  // Filter art so only those added by other users are visible on carousel
  let username;
  if (Auth.loggedIn()) {
    username = Auth.getProfile().data.username;
  }

  const { hero, share } = contentStyles();

  return (
    <>
      <Box>
        <Grid>
          <Typography
            // className={title}
            variant="h1"
            align="center"
            gutterBottom
          >
            Artin' Around
          </Typography>
        </Grid>
      </Box>
      <Box className={hero} textAlign="center">
        <Grid container maxWidth="md" className={share}>
          <Typography className={share} variant="h3" color="white">
            SHARE THE ART IN YOUR WORLD
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
