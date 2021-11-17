import React from 'react';
import { Link } from 'react-router-dom';
import '../global.css';

import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
} from '@material-ui/core';

import useStyles from './styles';

const ArtCard = ({ art }) => {
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <Card className={classes.card}>
          <Link to={`/art/${art._id}`}>
            <CardMedia
              className={classes.cardMedia}
              component="img"
              image={art.url}
              title={art.title}
            />
          </Link>
          <CardContent className={classes.CardContent}>
            <Typography gutterBottom variant="h5">
              {art.title}
            </Typography>
            <Typography>{art.location}</Typography>
            <Typography>
              Artist: {`${art.artist.firstName} ${art.artist.lastName}`}
            </Typography>
            <Typography>{art.description}</Typography>
            <Typography>
              Added by:{' '}
              <Link to={`/profile/${art.addedBy}`}>{art.addedBy}</Link>
            </Typography>
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
