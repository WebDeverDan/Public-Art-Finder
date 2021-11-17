import React from 'react';

import { Typography, Grid, Container } from '@material-ui/core';
import useStyles from '../pages/styles';

import ArtCard from './ArtCard';

const ArtInArea = ({ art, location }) => {
  const classes = useStyles();

  return (
    <>
      {art.length > 0 ? (
        <>
          <div className={classes.container}>
            <Container maxWidth="md">
              <Typography
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                All Public Art In {location}
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                {art.length} results for public art in your searched area.
              </Typography>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {art.map((art) => {
                return <ArtCard art={art} />;
              })}
            </Grid>
          </Container>
        </>
      ) : (
        <Container maxWidth="md">
          <Typography
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {!location
              ? `Search for art in a state!`
              : `No art added in ${location} yet.`}
          </Typography>
        </Container>
      )}
    </>
  );
};

export default ArtInArea;
