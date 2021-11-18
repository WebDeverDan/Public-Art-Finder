import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

import Auth from '../utils/auth';
import '../global.css';

const useStyles = makeStyles(() => ({
  signupGrid: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    marginTop: '30px',
  },
  signupBox: {
    color: 'black',
    alignContent: 'center',
  },
  signupCard: {
    padding: '10px',
    border: '8px solid #9b752a',
  },
  signupHeader: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0px',
    width: '100%',
  },
}));

const Signup = () => {
  const { signupGrid, signupBox, signupCard, signupHeader } = useStyles();

  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    isArtist: false,
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: name === 'isArtist' ? Boolean(value) : value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid className={signupGrid}>
      <Box className={signupBox}>
        <Card className={signupCard}>
          <h4 className={signupHeader}>Sign Up</h4>
          <div className="card-body">
            {data ? (
              <div
                className="mt-3 p-3 text-white text-center"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  backgroundColor: '#28a745',
                }}
              >
                Success! You are now signed up.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                Username
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                Email
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                Password
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <div>Are you an artist?</div>
                <label>
                  <input
                    type="radio"
                    name="isArtist"
                    value={true}
                    onChange={handleChange}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    name="isArtist"
                    value={false}
                    onChange={handleChange}
                  />
                  No
                </label>
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div
                className="mt-3 p-3 bg-danger text-white text-center"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  width: '274px',
                }}
              >
                {error.message}
              </div>
            )}
          </div>
        </Card>
      </Box>
    </Grid>
  );
};

export default Signup;
