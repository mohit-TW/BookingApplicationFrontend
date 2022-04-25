import React from "react";
import RootRouter from "../router/RootRouter";
import useAuth from "./hooks/useAuth";
import { BrowserRouter as Router } from "react-router-dom";
import { Box, Card, Container } from "@material-ui/core";
import Header from "../header/Header";
import styles from "../layout/styles/layoutStyles";

export default () => {
  const { isAuthenticated, handleLogin, handleLogout } = useAuth();
  const classes = styles();

  return (
    <Router>
      <Box>
        <Header onLogout={handleLogout} isAuthenticated={isAuthenticated} />
        <Container maxWidth={false} className={classes.container}>
          <Card>
            <RootRouter
              isAuthenticated={isAuthenticated}
              onLogin={handleLogin}
              handleLogout={handleLogout}
            />
          </Card>
        </Container>
      </Box>
    </Router>
  );
};

/**
 * <Box>
 *  <Hearder>
 *
 *  </Header>
 * <container>
 *  <Card>
 *
 *  </Card>
 * </container>
 * </Box>
 *
 *
 */
