import TicketForm from "./TicketForm";
import { Typography, Box } from "@mui/material";

function HomepageClient({ handleNewTicket }) {


  return (
    <>
      <Typography
        textAlign='center'
        variant='h4'
        sx={{ m: 2 }}
      >
        Welcome to Supportly
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
