// import './App.css';

import { Typography } from "@mui/material/";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import TicketForm from "./components/TicketForm";
import SupportlyApi from "./Api";


function App() {
  async function handleNewTicket(ticketFormData) {
    const response = await SupportlyApi.submitTicket(ticketFormData);
    console.debug("response= ", response);

    if (response.ok) {
      alert(`Success! Ticket created.`);
    } else {
      alert(`Failure! Problem creating ticket.`);
    }
  }

  async function handleSignup(signupFormData) {
    const response = await SupportlyApi.signupUser(signupFormData);
    console.debug("response= ", response);

    if (response.ok) {
      alert(`Successfully created user.`);
    } else {
      alert(`Failed to create user.`);
    }
  }

  async function handleLogin(loginFormData) {
    const response = await SupportlyApi.loginUser(loginFormData);
    console.debug("response= ", response);

    if (response.ok) {
      alert(`Successfully logged in user.`);
    } else {
      alert(`Failed to log in user.`);
    }
  }

  function handleLogout() {
    setToken(() => null);
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
        onSubmit={handleNewTicket}
      />

      <SignupForm
        onSubmit={handleSignup}
      />

      <LoginForm
        onSubmit={handleLogin}
      />
    </>
  );
}

export default App;
