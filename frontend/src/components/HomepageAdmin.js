import { useState, useEffect } from "react";
import SupportlyApi from "../Api";
import { Drawer, Typography, Box, CircularProgress } from "@mui/material";
import TicketCard from "./TicketCard";
import TicketEditModal from "./TicketEditModal";


function HomepageAdmin() {

  const [pageData, setPageData] = useState({
    isLoading: true,
    tickets: [],
  });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currTicket, setCurrTicket] = useState(null);

  useEffect(
    function loadTicketsOnMount() {
      async function getAllTickets() {
        const tickets = await SupportlyApi.getTickets();

        setPageData({
          isLoading: false,
          tickets: tickets,
        });
      }
      getAllTickets();
    },
    []
  );

  function getOnClickTicket(ticket) {
    return () => {
      setCurrTicket(ticket);
      setDrawerOpen(true);
    };
  }

  function handleTicketUpdate(ticketId, newStatus) {
    setPageData((state) => ({
      ...state,
      tickets: state.tickets.map((t) => (
        t.id === ticketId
          ? { ...t, statusName: newStatus }
          : { ...t }
      ))
    }));
    setCurrTicket((t) => ({
      ...t,
      statusName: newStatus,
    }));
  }

  return (
    <>
      <Typography
        textAlign='center'
        variant='h4'
        sx={{ m: 2, mt: 4, }}>
        Welcome, Admin, to Supportly
      </Typography>

      <Typography
        textAlign='center'
        sx={{ m: 2 }}>
        As an admin, you can view tickets and click into them to update their status.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        {
          pageData.isLoading
            ? <Box
              m={2}
              mt={4}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Typography mx={2} variant="h5">Loading tickets...</Typography>
              <CircularProgress mx={2} />
            </Box>
            : pageData.tickets.map(
              (t) => {
                return <TicketCard
                  key={t.id}
                  ticket={t}
                  onClick={getOnClickTicket(t)}/>;
              })
        }
      </Box>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}>
        <TicketEditModal
          ticket={currTicket}
          closeDrawer={() => setDrawerOpen(false)}
          handleTicketUpdate={handleTicketUpdate}/>
      </Drawer>

    </>
  );
}

export default HomepageAdmin;
