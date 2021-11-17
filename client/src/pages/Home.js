import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import { makeStyles, Typography } from '@material-ui/core';
import Grid from '@mui/material/Grid';

import Auth from '../utils/auth';

import HeroImage from '../image/colorfulSky.jpg';
//import HeroImage from '../image/HeroImage2.png';
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

  const { hero } = contentStyles();

  return (
    <>
      <Box>
        <Grid>
          <Typography
            className={title}
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

      <Link to='/explore'>EXPLORE</Link>
      {Auth.loggedIn() ? (
        <Link to='/addArt'>ADD ART +</Link>
      ) : null}
    </>
  );
};

export default Home;
