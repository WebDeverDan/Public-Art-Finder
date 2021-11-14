import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_ART } from '../utils/mutations';

import { QUERY_ART } from '../utils/queries';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const ArtForm = () => {
  const stateArray = [
    '',
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  // Initial form state is empty
  const [formData, setFormData] = useState({
    title: '',
    artist: {
      firstName: '',
      lastName: '',
    },
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

      // Update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, addedArt: [...me.addedArt, addArt] } },
      });
    },
  });

  // On form submission, call addArt mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(formData);

    try {
      // Call addArt and pass through our formData
      const { data } = await addArt({
        variables: {
          art: { ...formData },
        },
      });

      // Reset form state back to empty
      setFormData({
        title: '',
        artist: {
          firstName: '',
          lastName: '',
        },
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

    if (name === 'artistFirstName' || name === 'artistLastName') { // If statements because artist is nested object
      if (name === 'artistFirstName') {
        setFormData({
          ...formData,
          artist: { ...formData.artist, firstName: value },
        });
      } else {
        setFormData({
          ...formData,
          artist: { ...formData.artist, lastName: value },
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
          ></input>
          <input
            name="artistFirstName"
            value={formData.artist.firstName}
            onChange={handleChange}
          ></input>
          <input
            name="artistLastName"
            value={formData.artist.lastName}
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
          <label>Location</label>
          <select name="location" onChange={handleChange}>
            {stateArray.map((state) => {
              return (
                <option key={state} value={state}>
                  {state}
                </option>
              );
            })}
          </select>
          <button type="submit">Submit Artwork</button>
        </form>
      ) : (
        <div>You must be logged in to add artwork.</div>
      )}
    </>
  );
};

export default ArtForm;
