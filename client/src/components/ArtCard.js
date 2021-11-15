import React from 'react';
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from '@material-ui/core';

import imageArt from '../magnolia.jpg';
import useStyles from './styles';

const ArtCard = () => {
  const classes = useStyles();

  //the item key will need to be set to whatever you are mapping over example:
  //const cards = []
  // {cards.map((card) =>(  (where cards = your data received or an array) hope this makes sense.

  return (
    <>
      <Grid item key={card} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            src={imageArt}
            title="Image Title"
          />
          <CardContent className={classes.CardContent}>
            <Typography gutterBottom variant="h5">
              Heading
            </Typography>
            <Typography>
              This is a media card used to describe the content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
            <Button size="small" color="primary">
              View Artist
            </Button>
          </CardActions>
        </Card>
      </Grid>
      ))} ;
    </>
  );
};

export default ArtCard;
