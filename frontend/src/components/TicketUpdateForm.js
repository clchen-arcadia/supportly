import { useState } from "react";
import SupportlyApi from "../Api";
import { Box, Alert, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


function TicketUpdateForm({ ticketId }) {

  const [formData, setFormData] = useState({
    new_status: '',
  });

  const [errors, setErrors] = useState("");
  const [severity, setSeverity] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault();

    try {
      const message = await SupportlyApi.updateTicket(formData, ticketId);
      setSeverity("success");
      setErrors(message);
      navigate(0);
    } catch (err) {
      setSeverity("warning");
      setErrors(err.response.data.errors);
      console.warn("TicketUpdate caught errors", err);
    }
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  }

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
          width: '100%',
        }}
      >
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
              />
              <label htmlFor="trainee">New</label>
            </Box>

            <Box>
              <input
                onChange={handleChange}
                type="radio"
                name="new_status"
                value="in-progress"
              />
              <label htmlFor="trainer">In Progress</label>
            </Box>

            <Box>
              <input
                onChange={handleChange}
                type="radio"
                name="new_status"
                value="resolved"
              />
              <label htmlFor="trainer">Resolved</label>
            </Box>

          </label>
        </Box>

        <Box my={1}>
          <Button
            variant='contained'
            type='submit'
          >
            Submit
          </Button>
        </Box>

        {errors && <Alert severity={severity}>{errors}</Alert>}
      </Box>

    </form>
  );
}

export default TicketUpdateForm;
