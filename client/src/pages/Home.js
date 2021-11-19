import React from 'react';

import Auth from '../utils/auth';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Gallery from '../image/gallery.jpg';

// import Map from '../components/Map';
import { makeStyles, Typography, Container } from '@material-ui/core';
import Grid from '@mui/material/Grid';
import HeroImage from '../image/colorfulSky.jpg';
import CellPhone from '../image/cellphone.jpg';

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
    marginLeft: '30px',
    display: 'flex',
    justifyContent: 'flex-start',
  },
  cellphone: {
    backgroundImage: `url(${CellPhone})`,
    height: '300px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    backgroundSize: 'cover',
    border: '3px solid black',
  },
  Text: {
    height: '300px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    backgroundSize: 'cover',
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    textShadow: '4px 2px 5px  #000000',
  },
  Text2: {
    height: '300px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    backgroundSize: 'cover',
    justifyContent: 'space-evenly',
    textAlign: 'center',
    alignItems: 'center',
    color: 'navy',
    textShadow: '4px 2px 5px #000000',
    flexDirection: 'column',
    border: '3px solid #000000',
  },
  about: {
    margin: '30px 30px 30px 30px',
  },
  gallery: {
    backgroundImage: `url(${Gallery})`,
    height: '300px',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    position: 'relative',
    display: 'flex',
    backgroundSize: 'cover',
    border: '3px solid black',
  },
}));

const Home = () => {
  const { hero, share, explore, cellphone, Text, about, Text2, gallery } =
    contentStyles();

  return (
    <>
      <Box className={hero}>
        <Typography className={share} variant="h3" color="white">
          SHARE THE ART IN YOUR WORLD
        </Typography>
        <Grid className={explore}>
          <Stack direction="column" spacing={2}>
            <Button
              size="large"
              variant="contained"
              color="warning"
              href="/explore"
              style={{ width: '10em', height: '4em', borderRadius: '0' }}
            >
              EXPLORE
            </Button>
            {Auth.loggedIn() ? (
              <Button
                size="large"
                variant="contained"
                color="warning"
                href="/addArt"
                style={{ width: '10em', height: '4em', borderRadius: '0' }}
              >
                {' '}
                ADD ART
              </Button>
            ) : null}
          </Stack>
        </Grid>
      </Box>
      <Box className={about}>
        <Grid container spacing={2}>
          <Grid item lg={12}>
            <Container className={Text}>
              <Typography variant="h4">
                "The purpose of art is washing the dust of daily life off our
                souls" ~Salvador Dali
              </Typography>
            </Container>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={6} variant="outlined">
              <Container
                className={cellphone}
                alt="cellphone picture"
              ></Container>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box className={Text2}>
              <Typography variant="h4">Why use Artin' Around?</Typography>
              <Typography variant="h6">
                1. Cultivate an online gallery
              </Typography>
              <Typography variant="h6">
                2. Share amazing art in your life with others
              </Typography>
              <Typography variant="h6">
                3. Search for art wherever you go
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={6} variant="outlined">
              <Container className={gallery} alt="gallery picture"></Container>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
