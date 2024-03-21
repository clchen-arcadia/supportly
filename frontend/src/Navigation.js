import { React, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";

import { Box } from "@mui/material";


function Navigation({ handleLogout }) {
  const { data } = useContext(userContext);
  const isLoggedIn = data?.email !== undefined;
  // const isAdmin = data?.isAdmin === true;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        m={2}
      >
        <Link to="/">Supportly</Link>
      </Box>
      {
        isLoggedIn
          ?
          <Box
            m={2}
          >
            <NavLink
              to="/logout"
              onClick={handleLogout}
            >
              Logout&nbsp;{data?.email}
            </NavLink>
          </Box>
          :
          <Box
            m={2}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
            }}

          >
            <Box mx={2}>
              <NavLink to="/login">Login</NavLink>
            </Box>
            <Box mx={2}>
              <NavLink to="/signup">Signup</NavLink>
            </Box>
          </Box>
      }
    </Box>
  );
}

export default Navigation;
