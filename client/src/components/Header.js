import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from '@mui/material/';
import smallLogo from '../image/logo192.png';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
// import Signup from '../pages/Signup';
// import Login from '../pages/Login';
import Auth from '../utils/auth';
import PersonSharp from '@mui/icons-material/PersonSharp';
// import Switch from '@mui/material/Switch';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormGroup from '@mui/material/FormGroup';
import Menu from '@mui/material/Menu';
import { Avatar } from '@material-ui/core';
// import { InfoOutlined } from '@mui/icons-material';

const logout = (event, label) => {
  // event.preventDefault();
  if (label === 'Logout') {
    Auth.logout();
  }
};

const loggedOutData = [
  {
    label: "Artin' Around",
    href: '/',
  },
  {
    label: 'Login',
    href: '/login',
  },
  {
    label: 'Sign-up',
    href: '/signup',
  },
  {
    label: 'Explore',
    href: '/explore',
  },
];

const loggedInData = [
  {
    label: "Artin' Around",
    href: '/',
  },
  // {
  //   label: 'Profile',
  //   href: '/me',
  // },
  // {
  //   label: 'Logout',
  //   href: '/',
  // },
  // {
  //   label: 'Favorite Artwork',
  //   href: '/favoriteArtwork',
  // },
  // {
  //   label: 'Favorite Artists',
  //   href: '/favoriteArtists',
  // },
];

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: 'black !important',
  },
  menuButton: {
    color: 'white',
    '&:hover': {
      color: '#b6b6b6',
    },
  },
  mobileNav: {
    justifyContent: 'space-between',
    fontSize: '36px',
  },
  toolbar: {
    justifyContent: 'space-between',
    fontSize: '36px',
    flexDirection: 'row',
  },
  logo: {
    maxWidth: 160,
  },
}));

export default function Header() {
  const { header, mobileNav, menuButton, toolbar, drawerContainer, logo } =
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
        <Avatar src={smallLogo} alt="logo" className={logo} />
        <div>{getMenuButtons()}</div>
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
      </div>
    );
  };

  const getDrawerChoices = () => {
    return headersData.map(({ label, href, onClick }) => {
      return (
        <RouterLink>
          <Link
            {...{
              component: RouterLink,
              to: href,
              color: 'inherit',
              style: { textDecoration: 'none' },
              key: label,
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
          {Auth.loggedIn() ? <PersonSharp fontSize="36px" /> : null}
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
          <RouterLink>
            <MenuItem
              {...{
                value: 'Profile',
                to: '/me',
                component: RouterLink,
              }}
              onClick={handleClose}
            >
              Profile
            </MenuItem>
          </RouterLink>
          <RouterLink>
            <MenuItem
              {...{
                to: '/',
                component: RouterLink,
                onClick: (event) => {
                  logout(event, 'Logout');
                },
              }}
            >
              Logout
            </MenuItem>
          </RouterLink>
          <RouterLink>
            <MenuItem
              {...{
                value: 'Add Art',
                to: '/addArt',
                component: RouterLink,
              }}
              onClick={handleClose}
            >
              Add Art
            </MenuItem>
          </RouterLink>
          <RouterLink>
            <MenuItem
              {...{
                value: 'Explore',
                to: '/explore',
                component: RouterLink,
              }}
              onClick={handleClose}
            >
              Explore
            </MenuItem>
          </RouterLink>
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
