import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import '../../styles/updateEventPage.css';

const UpdateEventPage = () => {
  const { id } = useParams(); // Get the event ID from URL
  const { token } = useContext(AuthContext); // Get the token from context
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    location: '',
    dateAndTime: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/events/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': token,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setEventData({
            name: data.name || '',
            description: data.description || '',
            location: data.location || '',
            dateAndTime: data.dateAndTime ? new Date(data.dateAndTime).toISOString().slice(0, 16) : '',
          });
        } else {
          console.error('Failed to fetch event data:', data);
        }
      } catch (error) {
        console.error('Failed to fetch event data:', error);
      }
    };

    fetchEventData();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    const newErrors = {};
    if (!eventData.name) newErrors.name = 'Event name is required';
    if (!eventData.location) newErrors.location = 'Location is required';
    if (!eventData.dateAndTime) newErrors.dateAndTime = 'Date and time are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(eventData),
      });
      const result = await response.json();
      if (response.ok) {
        // Redirect to event details page
        navigate(`/events/${id}`);
      } else {
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error('Failed to update event:', error);
    }
  };

  return (
    <Container>
      <Paper className="update-event-container">
        <Typography variant="h5">Update Event</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Event Name"
            name="name"
            value={eventData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            multiline
            rows={4}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            error={!!errors.location}
            helperText={errors.location}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Date and Time"
            name="dateAndTime"
            type="datetime-local"
            value={eventData.dateAndTime}
            onChange={handleChange}
            error={!!errors.dateAndTime}
            helperText={errors.dateAndTime}
          />
          <Button type="submit" variant="contained" color="primary">
            Update Event
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateEventPage;
