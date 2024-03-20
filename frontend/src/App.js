// import './App.css';

import { Typography } from "@mui/material/";

import TicketForm from "./components/TicketForm";
import SupportlyApi from "./Api";


function App() {
  function onTicketFormSubmit(formData) {
    console.log(`submitted ticket form with formData=`, formData);
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
