import React from 'react';

import { Typography, Grid, Container } from '@material-ui/core';
import useStyles from '../pages/styles';

import ArtCard from './ArtCard';

import MasonryImageList from '../components/ArtMasonry';
import ImageList from '@mui/material/ImageList';

const ArtInArea = ({ art, location }) => {
  const classes = useStyles();

  return (
    <div style={{margin: '1em 0em 0em 0em'}}>
      {art.length > 0 ? (
        <>
            <Container maxWidth="lg">
              <Typography
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                <span style={{color: 'green'}}>{art.length}</span> PUBLIC ARTWORK(S) IN {location.toUpperCase()}
              </Typography>
            </Container>

          <ImageList variant='masonry' cols={4} gap={8} >
            {art.map((art) => {
              return <MasonryImageList art={art} />
            })}
          </ImageList>
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
      )
      }
    </div>
  );
};

export default ArtInArea;
