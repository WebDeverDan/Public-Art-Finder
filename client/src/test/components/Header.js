// import React from 'react';
// import { Link } from 'react-router-dom';

// import Auth from '../../utils/auth';

// const Header = () => {
//   const logout = (event) => {
//     event.preventDefault();
//     Auth.logout();
//   };
//   return (
//     <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
//       <div className="container flex-row justify-space-between-lg justify-center align-center">
//         <div>
//           <Link className="text-light" to="/">
//             <h1 className="m-0">Tech Thoughts</h1>
//           </Link>
//           <p className="m-0">Get into the mind of a programmer.</p>
//         </div>
//         <div>
//           {Auth.loggedIn() ? (
//             <>
//               <Link className="btn btn-lg btn-info m-2" to="/me">
//                 {Auth.getProfile().data.username}'s profile
//               </Link>
//               <button className="btn btn-lg btn-light m-2" onClick={logout}>
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link className="btn btn-lg btn-info m-2" to="/login">
//                 Login
//               </Link>
//               <Link className="btn btn-lg btn-light m-2" to="/signup">
//                 Signup
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Typography,
} from '@mui/material/';
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles';
import { Shadows } from '@material-ui/core/styles/shadows';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import Signup from '../../pages/Signup';
import Login from '../../pages/Login';
// import SingleThought from './pages/SingleThought';
// import Profile from './pages/Profile';
import Auth from '../../utils/auth';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import SearchAppBar from './searchbar';
import { InfoOutlined } from '@mui/icons-material';

const logout = (event, label) => {
  // event.preventDefault();
  if (label === 'Logout') {
    Auth.logout();
  }
};

const loggedOutData = [
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'Sign-up',
    href: '/signup',
  },
];

const loggedInData = [
  {
    label: 'Profile',
    href: '/me',
  },
  {
    label: 'Logout',
    href: '/',
  },
];

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'black',
  },
  mobileNav: {
    justifyContent: 'space-between',
    fontSize: '36px',
  },
  toolbar: {
    justifyContent: 'space-between',
    fontSize: '36px',
    marginLeft: '35%',
    marginRight: '25%',
    flexDirection: 'row',
  },
}));

export default function Header() {
  const { header, mobileNav, menuButton, toolbar, drawerContainer } =
    useStyles();

  let headersData;

  const [state, setState] = useState({
    mobileView: false,
    drawerOpen: false,
  });

  const { mobileView, drawerOpen } = state;

  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  Auth.loggedIn()
    ? (headersData = loggedInData)
    : (headersData = loggedOutData);
  // Auth.loggedIn() ? (headersData = loggedOutData) : (headersData = loggedInData);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1000
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };
  }, []);

  const displayDesktop = () => {
    console.log();
    return (
      <Toolbar className={toolbar}>
        <div>{getMenuButtons()}</div>
        <div>{mobileView ? null : <SearchAppBar />}</div>
        <div>{AccountAppBar()}</div>
      </Toolbar>
    );
  };

  const displayMobile = () => {
    const handleDrawerOpen = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: true }));
    const handleDrawerClose = () =>
      setState((prevState) => ({ ...prevState, drawerOpen: false }));

    return (
      <div>
        <Toolbar className={mobileNav}>
          <IconButton
            {...{
              edge: 'start',
              color: 'inherit',
              'aria-label': 'menu',
              'aria-haspopup': 'true',
              onClick: handleDrawerOpen,
            }}
          >
            <MenuIcon fontSize="36px" />
          </IconButton>
          <Drawer
            {...{
              anchor: 'top',
              open: drawerOpen,
              onClick: handleDrawerClose,
            }}
          >
            <div className={drawerContainer}>{getDrawerChoices()}</div>
          </Drawer>
          {AccountAppBar()}
        </Toolbar>
        <div marginTop="56px">{mobileView ? <SearchAppBar /> : null}</div>
      </div>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href, onClick, menuIcon }) => {
      return (
        <RouterLink>
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: 'inherit',
              style: { textDecoration: 'none' },
              key: label,
              className: menuIcon,
              onClick: (event) => {
                logout(event, label);
              },
            }}
          >
            <MenuItem>{label}</MenuItem>
          </Link>
        </RouterLink>
      );
    });
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href, onClick }) => {
      return (
        <Button
          {...{
            key: label,
            value: label,
            color: 'inherit',
            to: href,
            component: RouterLink,
            className: menuButton,
            onClick: (event) => {
              logout(event, label);
            },
          }}
        >
          {label}
        </Button>
      );
    });
  };

  const AccountAppBar = () => {
    const handleChange = (event) => {
      setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
        >
          {Auth.loggedIn() ? <AccountCircle fontSize="36px" /> : null}
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem
            {...{
              onClick: (event) => {
                logout(event, 'Logout');
              },
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </div>
    );
  };

  return (
    <header>
      <AppBar elevation={0} className={header}>
        {mobileView ? displayMobile() : displayDesktop()}
      </AppBar>
    </header>
  );
}
