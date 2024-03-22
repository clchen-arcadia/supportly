import { Typography, Box } from '@mui/material';
import TicketResponseForm from './TicketResponseForm';
import TicketUpdateForm from './TicketUpdateForm';


function TicketEditModal({ ticket, closeDrawer }) {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end'
        }}
        onClick={closeDrawer}
        m={1}
      >
        Close X
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '40%',
          }}
          my={3}
          mx={8}
        >

          <Typography>
            <span style={{ fontWeight: "bold" }}>Ticket ID:</span> {ticket.id}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Description:</span> {ticket.description}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Client Name:</span> {ticket.clientName}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Client Email:</span> {ticket.clientEmail}
          </Typography>

          <Typography>
            You can update the status, or send an email response to the ticket submitter
          </Typography>

          <TicketResponseForm ticketId={ticket.id} />
          <TicketUpdateForm ticketId={ticket.id} />
        </Box>
      </Box>



    </>
  );
}

export default TicketEditModal;
