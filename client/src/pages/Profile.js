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
import Container from '@mui/material/Container';
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

  let myProfile = false;
  if (window.location.pathname === '/me') {
    myProfile = true;
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
                <Typography variant="h3" align="center">
                  {myProfile
                    ? `Welcome ${userData.username}!`
                    : `${userData.username.toUpperCase()}`}
                </Typography>
              </div>
              <Container maxWidth="lg">
                <Typography
                  variant="h5"
                  align="center"
                  color="textPrimary"
                  gutterBottom
                >
                  {myProfile
                    ? `YOU'VE CONTRIBUTED ${userData.addedArt.length} PUBLIC ARTWORK(S) TO YOUR ALBUM`
                    : `${userData.username.toUpperCase()} HAS CONTRIBUTED ${
                        userData.addedArt.length
                      } PUBLIC ARTWORK(S) TO THEIR ALBUM`}
                </Typography>
              </Container>
              <Container maxWidth="md">
                <ImageList variant="masonry" cols={4} gap={8}>
                  {userData.addedArt.map((art) => {
                    return <MasonryImageList art={art} />;
                  })}
                </ImageList>
              </Container>
            </div>
          </Grid>
        </>
      )}
    </>
  );
};

export default Profile;
