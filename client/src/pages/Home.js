import React from 'react';
import Box from '@mui/material/Box';
import { useQuery } from '@apollo/client';
import { QUERY_ARTS } from '../utils/queries';
import ArtForm from '../components/ArtForm';
import ArtCarousel from '../components/ArtCarousel';
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
  // TODO: Get ~4 random artworks to pass into Carousel component
  const { loading, data } = useQuery(QUERY_ARTS);
  const artData = data?.arts || [];

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
      <br></br>
      <br></br>

      {loading ? <div>Loading...</div> : <ArtCarousel art={artData} />}
      <Grid container className={artFormContainer}>
        <Grid className={artFormStyle}>
          <ArtForm />
          {/* <Map /> */}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
