import { Box, Button, Alert, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


function SignupForm({ handleSignup }) {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    is_admin: true,
  });

  const [errors, setErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
      await handleSignup(formData);
      navigate("/");
    } catch (err) {
      setErrors(err.response.data.errors);
      console.warn("SignupForm caught errors", err);
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
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '300px',
        }}
      >
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
              id='email'
            />
          </label>
        </Box>

        <Box m={2}>
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

        <Box
          m={2}
          sx={{
            display: 'flex',
          }}
        >
          <Box>
            <Button
              variant='contained'
              type='submit'
              disabled={isLoading}
            >
              Signup
            </Button>
          </Box>

          {isLoading && <Box mx={2}><CircularProgress /></Box>}

        </Box>

        {errors && <Alert severity="warning">{errors}</Alert>}

      </Box>

    </form>
  );

}

export default SignupForm;
