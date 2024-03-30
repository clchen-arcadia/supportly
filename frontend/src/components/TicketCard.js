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
      sx={{
        width: {
          xs: '90%',
          sm: '540px',
        },
      }}
    >
      <Box
        bgcolor={color}
        onClick={onClick}
        p={{
          xs: 2,
          sm: 3,
        }}
        borderRadius={'4px'}
      >
        <Typography><span style={{ fontWeight: "bold" }}>Ticket status:</span> {ticket.statusName}</Typography>
        <Typography><span style={{ fontWeight: "bold" }}>Client Name:</span> {ticket.clientName}</Typography>
        <Typography><span style={{ fontWeight: "bold" }}>Client Email:</span> {ticket.clientEmail}</Typography>
        <Typography><span style={{ fontWeight: "bold" }}>Ticket description:</span><br />{ticket.description}</Typography>
      </Box>
    </Box>
  );
}

export default TicketCard;
