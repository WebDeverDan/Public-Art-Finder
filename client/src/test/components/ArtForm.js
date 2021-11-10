import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_ART } from '../../utils/mutations';

import { QUERY_ART } from '../../utils/queries';
import { QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const ArtForm = () => {
  // Initial form state is empty
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    image: '',
    description: '',
    location: '',
  });

  // Get addArt function using ADD_ART mutation, update cache(?)
  const [addArt, { error }] = useMutation(ADD_ART, {
    update(cache, { data: { addArt } }) {
      try {
        const { art } = cache.readQuery({ query: QUERY_ART });

        cache.writeQuery({
          query: QUERY_ART,
          data: { art: [addArt, ...art] },
        });
      } catch (e) {
        console.error(e);
      }

      // TODO: Add art to User typedef
      // Update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, art: [...me.art, addArt] } },
      });
    },
  });

  // On form submission, call addArt mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call addArt and pass through our formData
      const { data } = await addArt({
        variables: {
          ...formData,
          createdBy: Auth.getProfile().data.username,
        },
      });

      // Reset form state back to empty
      setFormData({
        title: '',
        artist: '',
        image: '',
        description: '',
        location: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  // When input changes, update state of form
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {Auth.loggedIn ? (
        <form onSubmit={handleFormSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
          <input
            name="artist"
            value={formData.artist}
            onChange={handleChange}
          ></input>
          <input
            name="image"
            value={formData.image}
            onChange={handleChange}
          ></input>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></input>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
          ></input>
          <button type="submit">Submit Artwork</button>
        </form>
      ) : (
        <div>You must be logged in to add artwork.</div>
      )}
    </>
  );
};

export default ArtForm;
