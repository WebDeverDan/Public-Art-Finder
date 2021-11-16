import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useMutation } from '@apollo/client';
import { ADD_ART } from '../utils/mutations';

import { QUERY_ARTS } from '../utils/queries';
// import { QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import { fontFamily } from '@mui/system';

const ArtForm = () => {
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
    description: '',
    location: '',
  });

  const [image, setImage] = useState(null);

  const imageInputRef = useRef();

  // Get addArt function using ADD_ART mutation, update cache(?)
  const [addArt, { error, data }] = useMutation(ADD_ART, {
    update(cache, { data: { addArt } }) {
      try {
        const { arts } = cache.readQuery({ query: QUERY_ARTS });

        cache.writeQuery({
          query: QUERY_ARTS,
          data: { arts: [addArt, ...arts] },
        });
      } catch (e) {
        console.error(e);
      }

      // Update me object's cache
      // const { me } = cache.readQuery({ query: QUERY_ME });
      // cache.writeQuery({
      //   query: QUERY_ME,
      //   data: { me: { ...me, addedArt: [...me.addedArt, addArt] } },
      // });
    },
  });

  // On form submission, call addArt mutation
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Request to the cloudinary api to give us back a url of the uploaded image
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

    try {
      // Call addArt and pass through our formData
      const { data } = await addArt({
        variables: {
          art: { ...formData, url },
        },
      });

      // Reset form state back to empty
      setFormData({
        title: '',
        artist: {
          firstName: '',
          lastName: '',
        },
        description: '',
        location: '',
      });

      setImage(null);

      imageInputRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  // When input changes, update state of form
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'firstName' || name === 'lastName') {
      setFormData({
        ...formData,
        artist: { ...formData.artist, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const { addGrid, addBox, addCard, addHeader, addText, stateSelection } =
    useStyles();

  return (
    <>
      {Auth.loggedIn() ? (
        <>
          <Grid className={addGrid}>
            <Box className={addBox}>
              <Card className={addCard}>
                <h4 className={addHeader}>Add New Art</h4>
                <form onSubmit={handleFormSubmit}>
                  {/* Title */}
                  <input
                    className="form-input"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                  ></input>
                  <p className={addText}>
                    Title<span style={{ color: 'red' }}>*</span>
                  </p>

                  {/* Artist First Name */}
                  <input
                    className="form-input"
                    name="firstName"
                    value={formData.artist.firstName}
                    onChange={handleChange}
                  ></input>
                  <p className={addText}>Artist First Name</p>

                  {/* Artist Last Name */}
                  <input
                    className="form-input"
                    name="lastName"
                    value={formData.artist.lastName}
                    onChange={handleChange}
                  ></input>
                  <p className={addText}>Artist Last Name</p>

                  {/* Image */}
                  <input
                    key=""
                    className="form-input"
                    accept="image/*"
                    type="file"
                    name="image"
                    onChange={(e) => setImage(e.target.files[0])}
                    ref={imageInputRef}
                  />
                  <p className={addText}>
                    Upload a Photo<span style={{ color: 'red' }}>*</span>
                  </p>

                  {/* Description */}
                  <input
                    className="form-input"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></input>
                  <p className={addText}>Description</p>

                  {/* Location */}
                  <select
                    className="form-input"
                    name="location"
                    value={formData.location}
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
                  <p className={addText}>
                    State Location<span style={{ color: 'red' }}>*</span>
                  </p>

                  {/* Submit */}
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

                {data ? (
                  <div className={`mt-3 p-3 text-black ${addText}`} style={{backgroundColor: '#28a745', textAlign: 'center'}}>
                    Your art has been successfully added!
                  </div>
                ) : null}

                {error && (
                  <div className={`mt-3 p-3 text-black bg-danger ${addText}`} style={{textAlign: 'center', width: '418px'}}>
                  {error.message}
                </div>
                )}
              </Card>
            </Box>
          </Grid>
        </>
      ) : (
        <div style={{ color: 'white' }}>
          You must be logged in to add artwork.
        </div>
      )}
    </>
  );
};

export default ArtForm;
