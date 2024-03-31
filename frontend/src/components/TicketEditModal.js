import { Typography, Box, Button } from '@mui/material';
import TicketResponseForm from './TicketResponseForm';
import TicketUpdateForm from './TicketUpdateForm';
import { TICKET_STATUS_KEYS } from './TicketCard';


function TicketEditModal({ ticket, closeDrawer, handleTicketUpdate }) {

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
        <Box
          p={1.5}
          sx={{
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
            maxWidth: '1200px',
          }}>
          <Button onClick={closeDrawer}>Close X</Button>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <Box
          mb={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: {
              xs: '90%',
              sm: '540px',
            },
          }}>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Ticket ID:</span> {ticket.id}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Ticket Status:</span> {TICKET_STATUS_KEYS[ticket.statusName]}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Client Name:</span> {ticket.clientName}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Client Email:</span> {ticket.clientEmail}
          </Typography>

          <Typography>
            <span style={{ fontWeight: "bold" }}>Description:</span><br />{ticket.description}
          </Typography>

          <Typography my={1} mt={2}>
            You can update the status, or send an email response to the ticket submitter
          </Typography>

          <Box my={1}>
            <TicketResponseForm ticketId={ticket.id} />
          </Box>

          <Box my={1}>
            <TicketUpdateForm ticketId={ticket.id} handleTicketUpdate={handleTicketUpdate} />
          </Box>

        </Box>
      </Box>
    </>
  );
}

export default TicketEditModal;
