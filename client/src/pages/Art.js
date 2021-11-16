import React from 'react';

import { useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../utils/queries';

import ArtCard from '../components/ArtCard';

const Art = () => {
  const { artId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ART, {
    variables: { artId: userParam },
  });
  const artData = data?.art || {};

  return <>{loading ? <div>Loading...</div> : <ArtCard art={artData} />}</>;
};

export default Art;
