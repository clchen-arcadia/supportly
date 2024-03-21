import { React, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";

import { Box } from "@mui/material";


function Navigation({ handleLogout }) {
  const { data } = useContext(userContext);
  const isLoggedIn = data?.email !== undefined;
  // const isAdmin = data?.isAdmin === true;

  return (
    <nav>
      <Box>
        <Link to="/">Supportly</Link>
      </Box>
      {
        isLoggedIn
          ?
          <Box>
            <NavLink
              to="/logout"
              onClick={handleLogout}
            >
              Logout&nbsp;{data?.email}
            </NavLink>
          </Box>
          :
          <Box>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Signup</NavLink>
          </Box>
      }
    </nav>
  );
}

export default Navigation;
