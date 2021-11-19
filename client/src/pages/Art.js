import React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@mui/material';

import { useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import { QUERY_ART } from '../utils/queries';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  colorBorder: {
    display: 'block',
    borderImageSource: 'linear-gradient(270deg, #fe666b, #ff820c)',
    border: '5px solid black',
    borderRadius: '0',
    borderImageSlice: '1',
    borderWidth: '5px',
    padding: '2em',
  },
  altText: {
    fontFamily: '"JetBrains Mono", monospace',
  },
}));

const Art = () => {
  const { colorBorder, altText } = useStyles();

  const { artId: userParam } = useParams();

  const { loading, data } = useQuery(QUERY_ART, {
    variables: { artId: userParam },
  });
  const artData = data?.art || {};
  console.log(artData);

  return (
    <div style={{ margin: '2em 10em 2em 10em' }}>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <img
            src={artData.url}
            alt={artData.description}
            style={{ width: '100%', margin: '0em 0em 1em 0em' }}
          />
          <div className={colorBorder}>
            <Typography gutterBottom variant="h2">
              <span className={altText}>{artData.title}</span>
            </Typography>
            <Typography>
              <span className={altText}>LOCATION: </span>{artData.location}
            </Typography>
            {artData.artist.firstName || artData.artist.lastName ? (
              <Typography>
                <span className={altText}>ARTIST: </span>
                {artData.artist.firstName} {artData.artist.lastName}
              </Typography>
            ) : null}
            <Typography>
              <span className={altText}>DESCRIPTION: </span>
              {artData.description}
            </Typography>
            <Typography>
              <span className={altText}>ADDED BY: </span>
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
