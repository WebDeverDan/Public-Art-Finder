import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../utils/queries';

import ArtForm from '../components/ArtForm';
import Carousel from '../components/Carousel';
import Map from '../components/Map';
import { makeStyles } from "@material-ui/core";
import Grid from '@mui/material/Grid';

const contentStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "150px",
    minHeight: "calc(100vh - 288px)",
    width: "100%",
    [theme.breakpoints.down('sm')]: {
      minHeight: "calc(100vh - 250px)",
    },
  },
}));

const Home = () => {
  const { content } = contentStyles();
  // TODO: Get ~4 random artworks to pass into Carousel component, probably need a query to get *all* artwork
  const { loading, data } = useQuery(QUERY_ART);
  const art = data?.art || [];

  return (
    <>
    <Grid container className={content}>
        <Grid>
      {loading ? <div>Loading...</div> : <Carousel art={art} />}
      <ArtForm />
      <Map />
      </Grid>
      </Grid>
    </>
  );
};

export default Home;
