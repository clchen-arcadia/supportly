import { Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

import userContext from "./userContext.js";
import HomepageAdmin from "./components/HomepageAdmin.js";
import HomepageClient from "./components/HomepageClient.js";


function RoutesList({ handleLogin, handleSignup, handleProfileEdit }) {
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
            <Route path="/" element={<HomepageClient />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      }
    </>
  );
}

export default RoutesList;
