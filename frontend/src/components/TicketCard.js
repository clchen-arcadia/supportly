import { Box, Typography } from "@mui/material";


function TicketCard({ ticket, onClick }) {

  let color = '';

  switch (ticket.statusName) {
    case 'new':
      color = 'error.light';
      break;
    case 'in-progress':
      color = 'warning.light';
      break;
    case 'resolved':
      color = 'success.light';
      break;
    default:
      color = '';
  }

  return (
    <Box
      m={2}
    >
      <Box
        bgcolor={color}
        onClick={onClick}
        p={2}
        borderRadius={'4px'}
      >
        <Typography>Ticket status: {ticket.statusName}</Typography>
        <Typography>Client Email: {ticket.clientEmail}</Typography>
        <Typography>Client Name: {ticket.clientName}</Typography>
        <Typography>Ticket description: {ticket.description}</Typography>
      </Box>
    </Box>
  );
}

export default TicketCard;
