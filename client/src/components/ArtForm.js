import React, { useState } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_ART } from '../utils/mutations';

import { QUERY_ART } from '../utils/queries';
import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { fontFamily } from '@mui/system';

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
    // image: '',
    description: '',
    location: '',
  });
  const [image, setImage] = useState('');

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
    // request to the cloudinary api to give us back a url of the uploaded image
    const handleImageUpload = async () => {
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'klourmy8');
      data.append('cloud_name', 'art-finder');
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/art-finder/image/upload',
        data
      );
      return res.data.url;
    };

    const url = await handleImageUpload();

    console.log(url);
    console.log(formData);

    try {
      // Call addArt and pass through our formData
      const { data } = await addArt({
        variables: {
          art: { ...formData, url },
        },
      });
      console.log(data);

      // Reset form state back to empty
      setFormData({
        title: '',
        artist: {
          firstName: '',
          lastName: '',
        },
        // image: '',
        description: '',
        location: '',
      });
      setImage('');
    } catch (err) {
      console.error(err);
    }
  };

  // When input changes, update state of form
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'artistFirstName' || name === 'artistLastName') {
      // If statements because artist is nested object
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

  const useStyles = makeStyles(() => ({
    addGrid: {
      backgroundColor: 'white',
      boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.7)',
      borderRadius: '10px',
      width: '100%',
      marginBottom: '4em',
    },
    addBox: {
      color: 'black',
      alignContent: 'center',
    },
    addCard: {
      padding: '10px',
      border: '8px solid #9b752a',
    },
    addHeader: {
      backgroundColor: 'black',
      color: 'white',
      textAlign: 'center',
      padding: '10px 0px',
      width: '100%',
    },
    addText: {
      color: 'black',
      fontFamily: "'JetBrains Mono', monospace",
    },
    stateSelection: {
      width: '50%',
      height: '50%',
    },
  }));

  const { addGrid, addBox, addCard, addHeader, addText, stateSelection } =
    useStyles();

  return (
    <Grid className={addGrid}>
      <Box className={addBox}>
        <Card className={addCard}>
          <h4 className={addHeader}>Add New Art</h4>
          {Auth.loggedIn() ? (
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                name="title"
                value={formData.title}
                onChange={handleChange}
              ></input>
              <p className={addText}>Title</p>
              <input
                className="form-input"
                name="artistFirstName"
                value={formData.artist.firstName}
                onChange={handleChange}
              ></input>
              <p className={addText}>Artist First Name</p>
              <input
                className="form-input"
                name="artistLastName"
                value={formData.artist.lastName}
                onChange={handleChange}
              ></input>
              <p className={addText}>Artist Last Name</p>
              <input
                className="form-input"
                accept="image/*"
                type="file"
                name="image"
                value={formData.image}
                onChange={(e) => setImage(e.target.files[0])}
              ></input>
              <p className={addText}>Upload a Photo</p>
              <input
                className="form-input"
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></input>
              <p className={addText}>Description</p>
              {/* <label>Location</label> */}
              <select
                className="form-input"
                name="location"
                onChange={handleChange}
              >
                {stateArray.map((state) => {
                  return (
                    <option className={addText} key={state} value={state}>
                      {state}
                    </option>
                  );
                })}
              </select>
              <p className={addText}>State Location</p>
              <button
                className="btn btn-block btn-primary"
                style={{
                  cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
                type="submit"
              >
                Submit Artwork
              </button>
            </form>
          ) : (
            <div>You must be logged in to add artwork.</div>
          )}
        </Card>
      </Box>
    </Grid>
  );
};

export default ArtForm;
