import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

import SupportlyApi from "./Api";
import userContext from './userContext';
import Navigation from './Navigation';
import RoutesList from './RoutesList';
import useLocalStorage from "./useLocalStorage";

const TOKEN_STORAGE_KEY = "supportly-token";


function App() {

  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY);


  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {

          const { userId } = jwtDecode(token);
          SupportlyApi.token = token;
          const [success, currentUser] = await SupportlyApi.getCurrentUser(userId);
          if (success) {
            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
          } else {
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
            alert("Problem loading current user");
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


  async function handleNewTicket(ticketFormData) {
    const [success, message] = await SupportlyApi.submitTicket(ticketFormData);

    if (success) {
      alert(`Success! ${message}`);
    } else {
      alert(`Failure! ${message}`);
    }
  }

  async function handleSignup(signupFormData) {
    const [success, data] = await SupportlyApi.signupUser(signupFormData);

    if (success) {
      setToken(data);
    } else {
      alert(`Failed to create user.`);
    }
  }

  async function handleLogin(loginFormData) {
    const [success, data] = await SupportlyApi.loginUser(loginFormData);

    if (success) {
      setToken(data);
    } else {
      alert(`Failed to log in user.`);
    }
  }

  function handleLogout() {
    setToken(() => null);
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
