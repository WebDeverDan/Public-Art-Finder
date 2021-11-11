import React from 'react';

import { Link } from 'react-router-dom';

const Carousel = ({ art }) => {
  return(
    <>
      <Link to={`art/${art._id}`}>{art.title}</Link>
    </>
  );
};

export default Carousel;
