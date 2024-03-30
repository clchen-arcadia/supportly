import { Typography } from "@mui/material";
import LoginForm from "./LoginForm";


function LoginPage({ handleLogin }) {
  return (
    <>
      <Typography
        variant="h5"
        textAlign='center'
        sx={{ m: 2, mt: 4, }}
      >
        Log in as admin
      </Typography>
      <LoginForm handleLogin={handleLogin} />
    </>
  );
}

export default LoginPage;
