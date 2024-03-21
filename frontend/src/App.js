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
          try {
            const { userId } = jwtDecode(token);
            SupportlyApi.token = token;
            const currentUser = await SupportlyApi.getCurrentUser(userId);
            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
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


  async function handleNewTicket(ticketFormData) {
    const response = await SupportlyApi.submitTicket(ticketFormData);
    console.debug("response= ", response);

    if (response.ok) {
      alert(`Success! Ticket created.`);
    } else {
      alert(`Failure! Problem creating ticket.`);
    }
  }

  async function handleSignup(signupFormData) {
    const response = await SupportlyApi.signupUser(signupFormData);
    console.debug("response= ", response);

    if (response.ok) {
      alert(`Successfully created user.`);
    } else {
      alert(`Failed to create user.`);
    }
  }

  async function handleLogin(loginFormData) {
    const response = await SupportlyApi.loginUser(loginFormData);
    console.debug("response= ", response);

    if (response.ok) {
      alert(`Successfully logged in user.`);
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
