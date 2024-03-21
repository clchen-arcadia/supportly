// import './App.css';

import { Typography } from "@mui/material/";

import TicketForm from "./components/TicketForm";
import SupportlyApi from "./Api";


function App() {
  async function onTicketFormSubmit(ticketFormData) {
    // debugger;
    const response = await SupportlyApi.submitTicket(ticketFormData);

    if (response.ok) {
      alert(`Success! Ticket created.`);
    } else {
      alert(`Failure! Problem creating ticket.`);
    }
  }


  return (
    <>
      <nav>
        test
      </nav>
      <Typography variant="h4">
        Welcome to Supportly
      </Typography>

      <TicketForm
        onSubmit={onTicketFormSubmit}
      />
    </>
  );
}

export default App;
