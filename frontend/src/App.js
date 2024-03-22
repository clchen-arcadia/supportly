import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

import SupportlyApi from "./Api";
import userContext from './userContext';
import Navigation from './Navigation';
import RoutesList from './RoutesList';
import useLocalStorage from "./useLocalStorage";
import { Typography } from '@mui/material';

const TOKEN_STORAGE_KEY = "supportly-token";


function App() {

  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY);

  console.debug("App rendered with currentUser=", currentUser, "token=", token);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            const { userId } = jwtDecode(token);
            SupportlyApi.token = token;
            const user = await SupportlyApi.getCurrentUser(userId);
            setCurrentUser({
              infoLoaded: true,
              data: user
            });
          } catch (err) {
            console.warn("Caught error loading user: ", err);
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  async function handleSignup(signupFormData) {
    const token = await SupportlyApi.signupUser(signupFormData);
    setToken(token);
  }

  async function handleLogin(loginFormData) {
    const token = await SupportlyApi.loginUser(loginFormData);
    setToken(token);
  }

  function handleLogout() {
    setToken(() => null);
  }

  if (currentUser.infoLoaded === false) {
    return (
      <Typography
        variant="h5"
        textAlign='center'
        sx={{ m: 2, mt: 5 }}
      >
        Loading...
      </Typography>
    );
  }

  return (
    <userContext.Provider value={currentUser}>
      <BrowserRouter>
        <Navigation
          handleLogout={handleLogout}
        />
        <RoutesList
          handleLogin={handleLogin}
          handleSignup={handleSignup}
        />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
