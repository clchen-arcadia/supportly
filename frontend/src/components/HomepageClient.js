import TicketNewForm from "./TicketNewForm";
import { Typography, Box } from "@mui/material";


function HomepageClient() {

  return (
    <>
      <Typography
        variant='h4'
        textAlign='center'
        sx={{ m: 2 }}
      >
        Welcome to Supportly
      </Typography>

      <Typography
        textAlign='center'
        sx={{ m: 2 }}
      >
        As a client, you can submit new tickets to our support staff.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TicketNewForm />
      </Box>
    </>
  );
}

export default HomepageClient;
