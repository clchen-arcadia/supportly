import { useState } from "react";
import SupportlyApi from "../Api";
import { Box, Alert, Button } from "@mui/material";


function TicketResponseForm({ ticketId }) {

  const [formData, setFormData] = useState({
    response: '',
  });

  const [errors, setErrors] = useState("");
  const [severity, setSeverity] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const message = await SupportlyApi.respondToTicket(formData, ticketId);
      setSeverity("success");
      setErrors(message);
    } catch (err) {
      setSeverity("warning");
      setErrors(err.response.data.errors);
      console.error("TicketResponse errors", err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  const inputStyles = {
    width: '100%',
    padding: '7.5px 3px',
    borderRadius: '4px',
    border: '1px solid rgb(118, 118, 118)',
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          // width: '300px',
        }}
      >
        <Box m={2}>
          <label htmlFor='response'>
            <span style={{ fontWeight: 'bold' }}>
              Response</span><span style={{ color: 'red' }}>*</span>
            <br />
            <textarea
              name='response'
              type='response'
              value={formData.response}
              onChange={handleChange}
              style={inputStyles}
              id='response'
              rows={5}
            />
          </label>
        </Box>

        <Box m={2}>
          <Button
            variant='contained'
            type='submit'
          >
            Respond
          </Button>
        </Box>

        {errors && <Alert severity={severity}>{errors}</Alert>}
      </Box>

    </form>
  );
}

export default TicketResponseForm;
