import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../utils/queries';

import ArtForm from '../components/ArtForm';
import Carousel from '../components/Carousel';
import Map from '../components/Map';

const Home = () => {
  // TODO: Get ~4 random artworks to pass into Carousel component
  const { loading, data } = useQuery(QUERY_ART);
  const art = data?.art || [];

  return (
    <>
      {loading ? <div>Loading...</div> : <Carousel art={art} />}
      <ArtForm />
      <Map />
    </>
  );
};

export default Home;
