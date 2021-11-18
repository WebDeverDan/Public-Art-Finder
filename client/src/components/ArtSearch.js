import React, { useState } from 'react';

import { Container, Typography } from '@mui/material';
import { Select, FormControl, MenuItem, InputLabel } from '@mui/material';

import { useQuery } from '@apollo/client';
import { QUERY_ART_BY_LOCATION } from '../utils/queries';

import ArtInArea from './ArtInArea';

const ArtSearch = () => {
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

  // Start with empty location state
  const [location, setLocation] = useState('');

  const { loading, error, data, refetch } = useQuery(QUERY_ART_BY_LOCATION, {
    variables: { location: location },
  });
  const artData = data?.artsByLocation || [];

  // Refetch art by location, reset location state
  const handleChange = (event) => {
    const { value } = event.target;

    refetch({ location: value });
    setLocation(value);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          <span style={{ color: 'red' }}>E</span>
          <span style={{ color: 'orange' }}>X</span>
          <span style={{ color: 'yellow' }}>P</span>
          <span style={{ color: 'green' }}>L</span>
          <span style={{ color: 'blue' }}>O</span>
          <span style={{ color: 'indigo' }}>R</span>
          <span style={{ color: 'violet' }}>E</span> STREET ART AROUND THE U.S.
        </Typography>
      </Container>
      <div style={{margin: '1em'}}>
        <FormControl fullWidth>
          <InputLabel id="state">State</InputLabel>
          <Select
            labelId="state"
            id="state-select"
            label="State"
            value={location}
            onChange={handleChange}
          >
            {stateArray.map((state) => {
              return (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ArtInArea art={artData} location={location} />
        )}
      </div>
    </>
  );
};

export default ArtSearch;
