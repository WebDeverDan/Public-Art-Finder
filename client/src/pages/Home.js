import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// import Map from '../components/Map';
import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import HeroImage from '../image/colorfulSky.jpg';

const contentStyles = makeStyles((theme) => ({
  hero: {
    height: '500px',
    backgroundImage: `url(${HeroImage})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    textAlign: 'right',
    fontSize: '4rem',
    backgroundSize: 'cover',
    color: 'white',
    fontWeight: 'bolder',
    flexDirection: 'column',
  },
  share: {
    textShadow: '4px 4px  #000000',
    marginRight: '30px',
    marginTop: '30px',
  },
  explore: {
    marginBottom: '30px',
    marginRight: '30px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

const Home = () => {
  const { hero, share, explore } = contentStyles();

  return (
    <>
      <Box className={hero}>
        <Typography className={share} variant="h3" color="white">
          SHARE THE ART IN YOUR WORLD
        </Typography>
        <Grid className={explore}>
          <Stack direction="row" spacing={2}>
            <Button size="large" variant="contained" href="/explore">
              EXPLORE
            </Button>
            {Auth.loggedIn() ? (
              <Button size="large" variant="contained" href="/addArt">
                {' '}
                ADD ART
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Box>
      <Box></Box>
    </>
  );
};

export default Home;
