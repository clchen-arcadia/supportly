import TicketForm from "./TicketForm";
import { Typography, Box } from "@mui/material";

function HomepageClient({ handleNewTicket }) {


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
        <TicketForm
          onSubmit={handleNewTicket}
        />
      </Box>
    </>
  );
}

export default HomepageClient;
