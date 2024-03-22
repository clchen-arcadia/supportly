import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import userContext from "./userContext.js";
import HomepageAdmin from "./components/HomepageAdmin.js";
import HomepageClient from "./components/HomepageClient.js";
import LoginPage from "./components/LoginPage.js";
import SignupPage from "./components/SignupPage.js";


function RoutesList({ handleLogin, handleSignup }) {
  const { data } = useContext(userContext);
  const isLoggedIn = data?.email !== undefined;
  // const isAdmin = data?.isAdmin === true;

  return (
    <>
      {
        isLoggedIn
          ?
          <Routes>
            <Route path="/" element={<HomepageAdmin />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          :
          <Routes>
            <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
            <Route path="/signup" element={<SignupPage handleSignup={handleSignup} />} />
            <Route path="/" element={<HomepageClient />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      }
    </>
  );
}

export default RoutesList;
