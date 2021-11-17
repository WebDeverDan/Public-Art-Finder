import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import '../global.css';

function ArtCarousel({ art }) {
  const styles = {
    paper: {
      width: '100%',
      height: '310px',
      backgroundColor: 'white',
    },
  };

  return (
    <Carousel
      indicatorIconButtonProps={{
        style: {
          color: '#9B752A',
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          color: 'white',
        },
      }}
      navButtonsProps={{
        style: {
          backgroundColor: 'white',
          borderRadius: 0,
        },
      }}
    >
      {art.map((art, i) => (
        <Paper
          key={i}
          style={styles.paper}
          sx={{ pt: 0.5, flexDirection: 'column' }}
        >
          {/* <h2>{art.title}</h2> */}
          <div className="carousel_image_box">
            <a href={`/art/${art._id}`}>
              <img
                className="carousel_image"
                src={art.url}
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
