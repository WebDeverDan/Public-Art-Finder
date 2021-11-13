import React from 'react';

import { useParams } from 'react-router';

import { useQuery } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Card from '../components/Card';
import Map from '../components/Map';

// TODO: Query all art for specific user, render to page
const Profile = () => {
  const { userId: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { userId: userParam },
  });
  const userData = data?.me || data?.user || {};

  return (
    <>
      <div>{userData.username}</div>
      <div>{userData.email}</div>
      <div>{userData.addedArt}</div>
    </>
  );
};

export default Profile;
