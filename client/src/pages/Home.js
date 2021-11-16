import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ARTS } from '../utils/queries';

import ArtForm from '../components/ArtForm';
import ArtCarousel from '../components/ArtCarousel';
import Map from '../components/Map';
import { makeStyles } from '@material-ui/core';
import Grid from '@mui/material/Grid';

const contentStyles = makeStyles((theme) => ({
  artFormContainer: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'calc(100vh - 170px)',
    },
  },
  artFormStyle: {
    color: 'black !important',
  }
}));

const Home = () => {
  const { artFormContainer, artFormStyle } = contentStyles();
  // TODO: Get ~4 random artworks to pass into Carousel component
  const { loading, data } = useQuery(QUERY_ARTS);
  const artData = data?.arts || [];

  return (
    <>
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
