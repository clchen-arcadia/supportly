import { useState, useEffect } from "react";
import SupportlyApi from "../Api";
import { Drawer, Typography, Box } from "@mui/material";
import TicketCard from "./TicketCard";
import TicketEditModal from "./TicketEditModal";


function HomepageAdmin() {

  const [pageData, setPageData] = useState({
    isLoading: true,
    tickets: [],
  });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currTicket, setCurrTicker] = useState(null);

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

  function onClickTicket(ticket) {
    return () => {
      setCurrTicker(ticket);
      setDrawerOpen(true);
    };
  }

  return (
    <>
      <Typography
        textAlign='center'
        variant='h4'
        sx={{ m: 2 }}
      >
        Welcome, Admin, to Supportly
      </Typography>

      <Typography
        textAlign='center'
        sx={{ m: 2 }}
      >
        As an admin, you can view tickets and click into them to update their status.
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {
          pageData.isLoading
            ? <Typography textAlign='center'>Loading tickets...</Typography>
            : pageData.tickets.map(
              (t) => {
                return <TicketCard
                  key={t.id}
                  ticket={t}
                  onClick={onClickTicket(t)}
                />;
              })
        }
      </Box>

      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <TicketEditModal ticket={currTicket} closeDrawer={() => setDrawerOpen(false)} />
      </Drawer>

    </>
  );
}

export default HomepageAdmin;
