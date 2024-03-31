import { useState } from "react";
import SupportlyApi from "../Api";
import { Box, Alert, Button, CircularProgress } from "@mui/material";


function TicketUpdateForm({ ticketId, handleTicketUpdate }) {

  const [formData, setFormData] = useState({ new_status: '' });
  const [errors, setErrors] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();

    if (formData.new_status === '') {
      return;
    }

    setErrors("");
    setIsLoading(true);
    try {
      const message = await SupportlyApi.updateTicket(formData, ticketId);
      setSeverity("success");
      setErrors(message);

      setFormData(() => ({ new_status: '' }));
      const newStatus = formData.new_status;
      handleTicketUpdate(ticketId, newStatus);
    } catch (err) {
      setSeverity("warning");
      setErrors(err.response.data.errors);
      console.warn("TicketUpdate caught errors", err);
    }
    setIsLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}>

        <Box my={1}>
          <label htmlFor='status'>

            <span style={{ fontWeight: 'bold' }}>
              New status</span><span style={{ color: 'red' }}>*</span>
            <br />

            <Box>
              <input
                onChange={handleChange}
                type="radio"
                name="new_status"
                value="new"
                checked={formData.new_status === 'new'}/>
              <label htmlFor="trainee">New</label>
            </Box>

            <Box>
              <input
                onChange={handleChange}
                type="radio"
                name="new_status"
                value="in-progress"
                checked={formData.new_status === 'in-progress'}/>
              <label htmlFor="trainer">In Progress</label>
            </Box>

            <Box>
              <input
                onChange={handleChange}
                type="radio"
                name="new_status"
                value="resolved"
                checked={formData.new_status === 'resolved'}/>
              <label htmlFor="trainer">Resolved</label>
            </Box>

          </label>
        </Box>

        <Box
          my={1}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Box>
            <Button
              variant='contained'
              type='submit'
              disabled={isLoading}>
              Submit
            </Button>
          </Box>

          {isLoading && <Box mx={2}><CircularProgress size={'25px'} /></Box>}
        </Box>

        <Box visibility={errors === "" ? 'hidden' : 'visible'}>
          <Alert severity={severity}>{errors}</Alert>
        </Box>

      </Box>
    </form>
  );
}

export default TicketUpdateForm;
