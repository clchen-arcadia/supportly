import { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { jwtDecode } from "jwt-decode";

import SupportlyApi, { TOKEN_STORAGE_KEY } from "./Api";
import userContext from './userContext';
import Navigation from './Navigation';
import RoutesList from './RoutesList';
import useLocalStorage from "./useLocalStorage";

import LoadingScreen from './components/LoadingScreen';


function App() {

  const [userData, setUserData] = useState({ data: null, infoLoaded: false });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_KEY);

  console.debug("App rendered with userData=", userData, "token=", token);

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            const { userId } = jwtDecode(token);
            SupportlyApi.token = token;
            const user = await SupportlyApi.getCurrentUser(userId);
            setUserData({ infoLoaded: true, data: user });
          } catch (err) {
            console.warn("Caught error loading user: ", err);
            setUserData({ infoLoaded: true, data: null });
          }
        } else {
          setUserData({ infoLoaded: true, data: null });
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

  if (userData.infoLoaded === false) {
    return <LoadingScreen />;
  }

  return (
    <userContext.Provider value={userData}>
      <BrowserRouter>
        <Navigation
          handleLogout={handleLogout} />
        <RoutesList
          handleLogin={handleLogin}
          handleSignup={handleSignup} />
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
