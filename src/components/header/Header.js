import React, { useEffect, useState } from "react";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import styles from "./styles/headerStyles";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import useUser from "../user/hooks/useUser";
import userService from "../user/services/userService";
import { FeatureToggle} from "react-feature-toggles/lib";
import useTogggles from '../toggles/hooks/useToggles'


const Header = ({ onLogout, isAuthenticated, username}) => {
  const classes = styles();

  const [userName, setUsername] = useState(username);
  const {toggles, toggleNames} = useTogggles();

  useEffect(()=> {
    if(username ==='' && isAuthenticated){
      const user = userService.getLoggenInUserDetails().then((response) => setUsername(response.username));
    }
  })

  const logoutSection = () => {
    return (
      <div onClick={onLogout} className={classes.logoutLink}>
        <ExitToAppIcon />
        <Typography className={classes.headerLogo} variant="body1">
          Logout
        </Typography>
      </div>
    );
  };

  const userProfileSection = () => {
    return (
      <div className={classes.personProfileIcon}>
        <p>Welcome, {userName}!</p>
        <FeatureToggle featureName={toggleNames.VIEW_USER_PROFILE}>
        <Link to="/userProfile">
          <IconButton className={classes.profileIcon} data-testid="profileIcon">
            <PersonIcon />
          </IconButton>
        </Link>
        </FeatureToggle>
      </div>
    );
  };

  const whenLoggedIn = () => {
    if (isAuthenticated) {
      return (
        <div className={classes.loggedIn}>
          {userProfileSection()}
          {logoutSection()}
        </div>
      );
    }
  };
  return (
    <AppBar position={"sticky"}>
      <Toolbar className={classes.toolbar}>
        <a href="/" className={classes.headerLink}>
          <MovieIcon className={classes.cinemaLogoIcon} />
          <Typography className={classes.headerLogo} variant="h5">
            SkyFox Cinema
          </Typography>
        </a>
        {whenLoggedIn()}
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default Header;
