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
          {/* <div className={classes.container}> */}
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <span style={{color: 'green'}}>{art.length}</span> PUBLIC ARTWORKS IN {location.toUpperCase()}
              </Typography>
              {/* <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                <span style={{color: 'green'}}>{art.length}</span> results for public art in your searched area.
              </Typography> */}
            </Container>
          {/* </div> */}
          <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
              {art.map((art) => {
                return <ArtCard art={art} />;
              })}
            </Grid>
          </Container>
        </>
      ) : (
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            {!location
              ? (
                null
              )
              : (
                <Container maxWidth="lg">
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <span style={{color: 'red'}}>0</span> PUBLIC ARTWORKS IN {location.toUpperCase()}
              </Typography>
            </Container>
              )}
          </Typography>
        </Container>
      )}
    </>
  );
};

export default ArtInArea;
