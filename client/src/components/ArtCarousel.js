import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

function ArtCarousel({ art }) {
  const styles = {
    paper: {
      width: '100%',
      height: '20%',
      backgroundColor: 'gray',
    },
  };

  // Hardcoded art for testing in dev
  var items = [
    {
      name: 'Dog (artwork title goes here)',
      description: 'small description of the art',
      image:
        'https://cdn.cnn.com/cnnnext/dam/assets/201030094143-stock-rhodesian-ridgeback-super-tease.jpg',
    },
    {
      name: 'Baby Yoda (artwork title goes here)',
      description: 'small description of the art',
      image:
        'https://starwarsblog.starwars.com/wp-content/uploads/2019/12/update-the-child-merch-tall-v1a.jpg',
    },
  ];

  return (
    <Carousel>
      {art.map((art, i) => (
        <Paper
          key={i}
          style={styles.paper}
          sx={{ pt: 0.5, flexDirection: 'column' }}
        >
          <h2>{art.title}</h2>
          <div className="carousel_image_box">
            <a href={`/art/${art._id}`}>
            <img
              className="carousel_image"
              src={art.image}
              alt={art.description}
            />
            </a>
          </div>
        </Paper>
      ))}
    </Carousel>
  );
}

export default ArtCarousel;
