import { Typography } from "@mui/material";
import SignupForm from "./SignupForm";

function SignupPage({ handleSignup }) {

  return (
    <>
      <Typography
        variant="h5"
        textAlign='center'
        sx={{ m: 2 }}
      >
        Sign up for an admin account on Supportly
      </Typography>
      <SignupForm handleSignup={handleSignup} />
    </>
  );
}

export default SignupPage;
