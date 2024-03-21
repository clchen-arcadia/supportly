import { Box, Button } from '@mui/material';
import { useState } from 'react';


function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    onSubmit(formData);
  }

  const inputStyles = {};

  return (
    <form
      onSubmit={handleSubmit}
    >
      <Box>
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
          <label htmlFor='password'>
            <span style={{ fontWeight: 'bold' }}>
              Password</span><span style={{ color: 'red' }}>*</span>
            <br />
            <input
              name='password'
              type='password'
              value={formData.password}
              onChange={handleChange}
              style={inputStyles}
              id='password'
            />
          </label>
        </Box>

        <Button
          variant='contained'
          type='submit'
        >
          Login
        </Button>
      </Box>
    </form>

  );

}

export default LoginForm;
