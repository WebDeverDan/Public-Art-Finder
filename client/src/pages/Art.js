import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

import { useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../utils/queries';

const Art = () => {
  const { artId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ART, {
    variables: { artId: userParam },
  });
  const artData = data?.art || {};
  console.log(artData);

  return (
    <div style={{margin: '5em 5em 2em 5em'}}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img
            src={artData.url}
            alt={artData.description}
            style={{ width: '100%', margin: '0em 0em 1em 0em' }}
          />
          <div style={{ display: 'block' }}>
            <Typography gutterBottom variant="h2">
              {artData.title}
            </Typography>
            <Typography>LOCATION: {artData.location}</Typography>
            {artData.artist.firstName || artData.artist.lastName ? (
              <Typography>
                ARTIST: {artData.artist.firstName} {artData.artist.lastName}
              </Typography>
            ) : null}
            <Typography>DESCRIPTION: {artData.description}</Typography>
            <Typography>
              ADDED BY:{' '}
              <Link
                to={`/profile/${artData.addedBy}`}
                style={{ color: 'black' }}
              >
                {artData.addedBy}
              </Link>
            </Typography>
            {artData.comments.map((comment) => {
              return <Typography>{comment.commentText}</Typography>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Art;
