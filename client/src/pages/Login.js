import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import '../global.css';

import Auth from '../utils/auth';

const useStyles = makeStyles(() => ({
  loginGrid: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 30px rgba(255, 255, 255, 0.7)',
    borderRadius: '10px',
    marginTop: '30px',
  },
  loginBox: {
    color: 'black',
    alignContent: 'center',
  },
  loginCard: {
    padding: '10px',
    border: '8px solid #9b752a',
  },
  loginHeader: {
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    padding: '10px 0px',
    width: '100%',
  },
}));

const Login = (props) => {
  const { loginGrid, loginBox, loginCard, loginHeader } = useStyles();

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Grid className={loginGrid}>
      <Box className={loginBox}>
        <Card className={loginCard}>
          <h4 className={loginHeader}>Login</h4>
          <div className="card-body">
            {data ? (
              <div
                className="mt-3 p-3 text-white text-center"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  backgroundColor: '#28a745',
                }}
              >
                Success! You are now logged in.
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
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
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
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

export default Login;
