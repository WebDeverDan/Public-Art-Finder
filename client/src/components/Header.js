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
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Auth from '../utils/auth';
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
    label: 'Home',
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
];

const loggedInData = [
  {
    label: 'Home',
    href: '/',
  },
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
  header: {
    backgroundColor: "black !important",
  },
  menuButton: {
    color: "white",
    "&:hover": {
      color: "#b6b6b6",
    },
  },
  mobileNav: {
    justifyContent: 'space-between',
    fontSize: '36px',
  },
  menuIcon: {
    color: "white",
    background: "black",
    "&:hover": {
      color: "#b6b6b6",
    },
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
              className: {menuIcon},
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
