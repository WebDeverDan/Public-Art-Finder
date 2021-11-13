import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';

function ArtCarousel(props) {
  // we will put 20 items here
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
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

const styles = {
  paper: {
    width: '100%',
    height: '20%',
    backgroundColor: 'gray',
  },
};

function Item(props) {
  return (
    <Paper style={styles.paper} sx={{ pt: 0.5, flexDirection: 'column' }}>
      <h2>{props.item.name}</h2>
      <div class="carousel_image_box">
        <img class="carousel_image" src={props.item.image}></img>
      </div>
    </Paper>
  );
}

export default ArtCarousel;
