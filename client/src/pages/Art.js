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

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img
            src={artData.url}
            alt={artData.description}
            style={{ width: '100%' }}
          />
          <div style={{display: 'block'}}>
            <Typography gutterBottom variant="h3">
              {artData.title}
            </Typography>
            <Typography>{artData.location}</Typography>
            <Typography>
              Artist: {artData.artist.firstName} {artData.artist.lastName}
            </Typography>
            <Typography>{artData.description}</Typography>
            <Typography>
              Added by:{' '}
              <Link to={`/profile/${artData.addedBy}`} style={{color: 'black'}}>{artData.addedBy}</Link>
            </Typography>
            {artData.comments.map((comment) => {
              return <Typography>{comment.commentText}</Typography>;
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Art;
