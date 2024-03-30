import { Typography } from "@mui/material";
import SignupForm from "./SignupForm";


function SignupPage({ handleSignup }) {

  return (
    <>
      <Typography
        variant="h5"
        textAlign='center'
        sx={{ m: 2, mt: 4, }}
      >
        Sign up for an admin account
      </Typography>
      <SignupForm handleSignup={handleSignup} />
    </>
  );
}

export default SignupPage;
