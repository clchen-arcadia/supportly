import { useState } from "react";
import SupportlyApi from "../Api";
import { Box, Alert, Button, CircularProgress } from "@mui/material";


function TicketResponseForm({ ticketId }) {

  const [formData, setFormData] = useState({
    response: '',
  });
  const [errors, setErrors] = useState("");
  const [severity, setSeverity] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(evt) {
    evt.preventDefault();

    setErrors("");
    setIsLoading(true);
    try {
      const message = await SupportlyApi.respondToTicket(formData, ticketId);
      setSeverity("success");
      setErrors(message);
      setFormData({
        response: '',
      });
    } catch (err) {
      setSeverity("warning");
      setErrors(err.response.data.errors);
      console.warn("TicketResponse caught errors", err);
    }
    setIsLoading(false);
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
      }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
        }}>

        <Box my={1}>
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
              rows={5}/>
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
              Respond
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

export default TicketResponseForm;
