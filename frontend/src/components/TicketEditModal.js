import { Drawer, Typography, Box } from '@mui/material';

function TicketEditModal({ ticket, closeDrawer }) {
  console.log("TicketEditModal rendered with ticket=", ticket);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end'
        }}
        onClick={closeDrawer}
      >
        Close X
      </Box>
      <Typography>
        Viewing ticket id: {ticket.id}
      </Typography>

      <Typography>
        ticket description: {ticket.description}
      </Typography>

      <Typography>
        client name: {ticket.clientName}
      </Typography>

      <Typography>
        client email: {ticket.clientEmail}
      </Typography>

      <Typography>
        You can update the status, or send an email response to the ticket submitter
      </Typography>
    </>
  );
}

export default TicketEditModal;
