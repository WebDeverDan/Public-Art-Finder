import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ARTS } from '../utils/queries';

import ArtForm from '../components/ArtForm';
import ArtCarousel from '../components/ArtCarousel';
import Map from '../components/Map';

const Home = () => {
  // TODO: Get ~4 random artworks to pass into Carousel component
  const { loading, data } = useQuery(QUERY_ARTS);
  const artData = data?.arts || [];

  return (
    <>
      {loading ? <div>Loading...</div> : <ArtCarousel art={artData} />}
      <ArtForm />
      <Map />
    </>
  );
};

export default Home;
