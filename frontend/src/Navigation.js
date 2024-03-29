import { React, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";

import { Box } from "@mui/material";


function Navigation({ handleLogout }) {
  const { data } = useContext(userContext);
  const isLoggedIn = data?.email !== undefined;

  const navButtons = [];

  if (isLoggedIn) {
    navButtons.push(
      <NavLink to="/logout" onClick={handleLogout}>
        Logout&nbsp;{data?.email}
      </NavLink>
    );
  } else {
    navButtons.push(
      <NavLink to="/login">Login</NavLink>,
      <NavLink to="/signup">Signup</NavLink>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box m={2} >
        <Link to="/">Supportly</Link>
      </Box>


      <Box
        m={2}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {
          navButtons.map((btn, idx) => (
            <Box m={2} key={idx}>
              {btn}
            </Box>
          ))
        }
      </Box>

    </Box>
  );
}

export default Navigation;
