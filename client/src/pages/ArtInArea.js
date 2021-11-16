import React from 'react';

import { useParams } from 'react-router';

import { Typography, Grid, Container } from '@material-ui/core';
import useStyles from './styles';

import { useQuery } from '@apollo/client';
import { QUERY_ART_BY_LOCATION } from '../utils/queries';

import ArtCard from '../components/ArtCard';

const ArtInArea = () => {
  const { location: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ART_BY_LOCATION, {
    variables: { location: userParam },
  });
  const artData = data?.artsByLocation || [];

  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            All Public Art In your Area
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="textSecondary"
            paragraph
          >
            Here are all results for public art in your searched area.
          </Typography>
        </Container>
      </div>
      <Container className={classes.cardGrid} maxWidth="md">
        <Grid container spacing={4}>
          {artData.map((art) => {
            return <ArtCard art={art} />;
          })}
        </Grid>
      </Container>
    </>
  );
};

export default ArtInArea;
