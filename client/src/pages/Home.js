import React from 'react';

import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../utils/queries';

import ArtForm from '../components/ArtForm';
import ArtCarousel from '../components/ArtCarousel';
import Map from '../components/Map';

const Home = () => {
  // TODO: Get ~4 random artworks to pass into Carousel component, probably need a query to get *all* artwork
  const { loading, data } = useQuery(QUERY_ART);
  const art = data?.art || [];

  return (
    <>
      {loading ? <div>Loading...</div> : <ArtCarousel art={art} />}
      <ArtForm />
      <Map />
    </>
  );
};

export default Home;
