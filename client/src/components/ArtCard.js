import React from 'react';
import { Link } from 'react-router-dom';

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@material-ui/core';

// import imageArt from '../magnolia.jpg';
import useStyles from './styles';

const ArtCard = ({ art }) => {
  const classes = useStyles();

  //the item key will need to be set to whatever you are mapping over example:
  //const cards = []
  // {cards.map((card) =>(  (where cards = your data received or an array) hope this makes sense.

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            component="img"
            image={art.url}
            title={art.title}
          />
          <CardContent className={classes.CardContent}>
            <Typography gutterBottom variant="h5">
              {art.title}
            </Typography>
            <Typography>{art.location}</Typography>
            <Typography>
              {`${art.artist.firstName} ${art.artist.lastName}`}
            </Typography>
            <Typography>{art.description}</Typography>
            <Typography>Added by: <Link to={`/profile/${art.addedBy}`}>{art.addedBy}</Link></Typography>
            {art.comments.map((comment) => {
              return <Typography>{comment.commentText}</Typography>;
            })}
          </CardContent>
          {/* <CardActions>
            <Button size="small" color="primary">
              View
            </Button>
            <Button size="small" color="primary">
              View Artist
            </Button>
          </CardActions> */}
        </Card>
      </Grid>
    </>
  );
};

export default ArtCard;
