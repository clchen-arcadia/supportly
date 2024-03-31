import { React, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import userContext from "./userContext";

import { Box } from "@mui/material";


function Navigation({ handleLogout }) {
  const { data } = useContext(userContext);
  const isLoggedIn = data?.email !== undefined;

  const navButtonStyles = {
    textDecoration: 'none',
    color: '#fff',
    "&:hover": {
      textDecoration: "underline"
    },
  };

  const navButtons = [];

  if (isLoggedIn) {
    navButtons.push(
      <NavLink style={navButtonStyles} to="/logout" onClick={handleLogout}>
        Logout&nbsp;{data?.email}
      </NavLink>
    );
  } else {
    navButtons.push(
      <NavLink style={navButtonStyles} to="/login">Login</NavLink>,
      <NavLink style={navButtonStyles} to="/signup">Signup</NavLink>
    );
  }

  return (
    <Box
      p={2}
      bgcolor={'primary.main'}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        color: 'primary.main',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '1200px',
        }}>

        <Box>
          <Link style={navButtonStyles} to="/">Supportly</Link>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          {
            navButtons.map((btn, idx) => (
              <Box mx={1.5} key={idx}>
                {btn}
              </Box>
            ))
          }
        </Box>

      </Box>
    </Box>
  );
}

export default Navigation;
