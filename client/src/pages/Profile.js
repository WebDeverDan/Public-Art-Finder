import React from 'react';

import { Redirect, useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import Card from '../components/Card';
import Map from '../components/Map';

const Profile = () => {
  const { userId: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { userId: userParam },
  });
  const userData = data?.me || data?.user || {};

  console.log(userData);

  if (Auth.loggedIn() && Auth.getProfile().data._id === userParam) {
    return <Redirect to='/me' />
  }

  return (
    <>
      <div>{userData.username}</div>
      <div>{userData.email}</div>
      {/* TODO: Add art cards for user's addedArt... */}
    </>
  );
};

export default Profile;
