import { Box, Button } from '@mui/material';
import { useState } from 'react';


function validateTicketForm(formData) {
  let isValid = true;
  let warningMessage = '';

  const REQUIRED_FIELDS_TUPLES = [
    ['name', 'Name'],
    ['email', 'Email'],
    ['description', 'Ticket description'],
  ];

  for (const fieldTuple of REQUIRED_FIELDS_TUPLES) {
    if (formData[[fieldTuple[0]]] === '') {
      warningMessage += `${fieldTuple[1]} field is required. \n`;
      isValid = false;
    }
  }

  return [isValid, warningMessage];
}


function TicketForm({ onSubmit }) {
  // const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const [isValid, warningMessage] = validateTicketForm(formData);

    if (isValid) {
      onSubmit(formData);
    } else {
      alert(warningMessage);
    }
  }

  const inputStyles = {};

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Box>
        <Box>
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
              id='name'
            />
          </label>
        </Box>

        <Box>
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
              id='email'
            />
          </label>
        </Box>

        <Box>
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
            />
          </label>
        </Box>

        <Button
          variant='contained'
          type='submit'
        >
          Submit Ticket
        </Button>
      </Box>
    </form>
  );
}

export default TicketForm;