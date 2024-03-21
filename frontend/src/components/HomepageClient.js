import TicketForm from "./TicketForm";
import { Typography } from "@mui/material";

function HomepageClient({ handleNewTicket }) {


  return (
    <>
      <Typography variant="h4">
        Welcome to Supportly
      </Typography>

      <TicketForm
        onSubmit={handleNewTicket}
      />
    </>
  );
}

export default HomepageClient;
