import React, { useState } from 'react';

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
      <select
        className="form-input"
        name="location"
        value={location}
        onChange={handleChange}
        style={{width: '100%'}}
      >
        {stateArray.map((state) => {
          return (
            <option key={state} value={state}>
              {state}
            </option>
          );
        })}
      </select>
      <ArtInArea art={artData} location={location} />
    </>
  );
};

export default ArtSearch;
