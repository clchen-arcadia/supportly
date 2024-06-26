import { Box, Button, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import SupportlyApi from '../Api';


function TicketNewForm() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [errors, setErrors] = useState([]);
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
    setIsLoading(true);
    try {
      const message = await SupportlyApi.submitTicket(formData);
      setSeverity("success");
      setErrors([message]);
      setFormData((formData) => ({
        ...formData,
        description: '',
      }));
    } catch (err) {
      setSeverity("warning");
      setErrors(err.response.data.errors);
      console.warn("NewTicketForm caught errors", err);
    }
    setIsLoading(false);
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
          width: '300px',
        }}>

        <Box m={2}>
          <label htmlFor='name'>
            <span style={{ fontWeight: 'bold' }}>
              Name</span><span style={{ color: 'red' }}>*</span>
            <br />
            <input
              name='name'
              type='text'
              value={formData.name}
              onChange={handleChange}
              style={inputStyles}
              id='name'/>
          </label>
        </Box>

        <Box m={2}>
          <label htmlFor='email'>
            <span style={{ fontWeight: 'bold' }}>
              Email</span><span style={{ color: 'red' }}>*</span>
            <br />
            <input
              name='email'
              type='email'
              value={formData.email}
              onChange={handleChange}
              style={inputStyles}
              id='email'/>
          </label>
        </Box>

        <Box m={2}>
          <label htmlFor='description'>
            <span style={{ fontWeight: 'bold' }}>
              Description</span><span style={{ color: 'red' }}>*</span>
            <br />
            <textarea
              name='description'
              type='text'
              value={formData.description}
              onChange={handleChange}
              style={inputStyles}
              id='description'
              rows={5}/>
          </label>
        </Box>

        <Box
          m={2}
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}>
          <Box>
            <Button
              variant='contained'
              type='submit'
              disabled={isLoading}>
              Submit Ticket
            </Button>
          </Box>

          {isLoading && <Box mx={2}><CircularProgress size={'25px'} /></Box>}
        </Box>

        {errors && errors.map((e, idx) => (<Alert key={idx} severity={severity}>{e}</Alert>))}

      </Box>
    </form>
  );
}

export default TicketNewForm;
