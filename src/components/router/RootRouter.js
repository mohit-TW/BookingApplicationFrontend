// noinspection ES6CheckImport
import { Redirect, Route, Switch } from "react-router-dom";
import React from "react";
import Shows from "../shows/Shows";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import BlockIcon from '@material-ui/icons/Block';
import {Error} from "../common";
import {Login, ProtectedRoute} from "../login";
import Signup from "../signUp/Signup";
import PropTypes from "prop-types";
import moment from "moment";
import UserProfile from "../user/UserProfile";

const RootRouter = ({ isAuthenticated, onLogin, handleLogout}) => {
  const todayDate = moment().format("YYYY-MM-DD");
  
  return (
    <Switch>
      <Redirect path="/" exact to={`/shows?date=${todayDate}`} />
      <ProtectedRoute
        exact
        path="/shows"
        component={(props)=><Shows {...props} />}
        isAuthenticated={isAuthenticated}
      />
      <ProtectedRoute exact path="/userProfile" isAuthenticated={isAuthenticated}
                       component={(props) => <UserProfile {...props} />}/>
      <Route
        exact
        path="/login"
        component={(props) => (
          <Login
            isAuthenticated={isAuthenticated}
            onLogin={onLogin}
            {...props}
          />
        )}
      />
                <Route exact path="/login"
                       component={(props) => <Login isAuthenticated={isAuthenticated} onLogin={onLogin} {...props}/>}/>
                
                <Route exact path="/signup"
                       component={(props) => <Signup {...props}/>}/>
               
      {/* <Route exact path="/userProfile"
                       component={() => <UserProfile /> } /> */}
      <Route
        exact
        path="/error"
        component={() => (
          <Error
            errorIcon={ErrorOutlineIcon}
            errorMessage={"Oops..Something went wrong"}
          />
        )}
      />

      <Route
        exact
        path="/error"
        component={() => (
          <Error
            errorIcon={ErrorOutlineIcon}
            errorMessage={"Oops..Something went wrong"}
          />
        )}
      />

      <Route
        component={() => (
          <Error errorIcon={BlockIcon} errorMessage={"Not Found"} />
        )}
      />
    </Switch>
  );
};

RootRouter.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default RootRouter;
