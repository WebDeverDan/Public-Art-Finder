import * as React from 'react';
import { Link } from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function MasonryImageList({ art }) {
  return (
    <ImageListItem key={art.url}>
      <img
        src={`${art.url}?w=248&fit=crop&auto=format`}
        srcSet={`${art.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
        alt={art.title}
        loading="lazy"
      />
      <ImageListItemBar
        title={art.title}
        subtitle={art.username}
        actionIcon={
          <IconButton
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${art.title}`}
          >
            <Link to={`/art/${art._id}`}>
              <InfoIcon />
            </Link>
          </IconButton>
        }
      />
    </ImageListItem>
  );
}
