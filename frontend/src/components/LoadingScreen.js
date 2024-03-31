import { Typography, CircularProgress, Box } from '@mui/material';


function LoadingScreen() {
  return (
    <Box
      m={2}
      mt={5}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>

      <Typography
        mx={2}
        variant={"h5"}>
        Loading Supportly...
      </Typography>

      <CircularProgress mx={2} />

    </Box>
  );
}

export default LoadingScreen;
