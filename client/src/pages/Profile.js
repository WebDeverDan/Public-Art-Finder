import React from 'react';

import { Redirect, useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';
import MasonryImageList from '../components/ArtMasonry';
import ImageList from '@mui/material/ImageList';
//import ArtCard from '../components/ArtCard';
// import Map from '../components/Map';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

const profileStyles = makeStyles((theme) => ({
  profileContainer: {
    alignItems: 'center',
    fontSize: '40px',
    justifyContent: 'center',
  },
  profileColumn: {
    direction: 'column',
    display: 'block !important',
  },
  textStyle: {
    color: '#1a1a1a',
    paddingTop: '20px',
    paddingBottom: '20px',
    paddingLeft: '20px',
    display: 'block',
    width: '100%',
  },
}));

const Profile = () => {
  const { profileContainer, profileColumn, textStyle } = profileStyles();

  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });
  const userData = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/me" />;
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <Grid container className={profileContainer}>
            <div className={profileColumn}>
            <div className={textStyle}>
              <h1>Welcome {userData.username}!</h1>
              {/* {userData.email} */}
            </div>
            {/* <div className={textStyle}>{userData.email}</div> */}
            <Box sx={{ width: 500, height: 450 /* , overflowY: 'scroll' */ }}>
              <Typography variant="h3" align="center">
                Your Added Art
              </Typography>
              <ImageList variant="masonry" cols={3} gap={8}>
                {userData.addedArt.map((art) => {
                  return <MasonryImageList art={art} />;
                })}
              </ImageList>
            </Box>
            </div>
          </Grid>
        </>
      )}
    </>
  );
};

export default Profile;
