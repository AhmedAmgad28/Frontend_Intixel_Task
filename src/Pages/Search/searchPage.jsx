import React, { useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EventCard from '../../Components/eventCard';
import '../../styles/searchPage.css';

const SearchPage = () => {
  const [name, setName] = useState(''); // State for event name
  const [organizer, setOrganizer] = useState(''); // State for organizer name
  const [location, setLocation] = useState(''); // State for event location
  const [date, setDate] = useState(''); // State for event date
  const [events, setEvents] = useState([]); // State for search results
  const [validated, setValidated] = useState(false); // State for form validation

  // Handle form submission for searching events
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/search`, {
          params: { name, organizer, location, date }
        });
        setEvents(response.data); // Update state with search results
      } catch (error) {
        console.error('Search failed', error); // Log any errors
      }
    }
    setValidated(true); // Set form as validated
  };

  return (
    <Container className="searchpage-container">
      <Container className="search-bar-container">
        <h2>Search Events</h2>
        <form noValidate validated={validated} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Event Name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Organizer"
                fullWidth
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Location"
                fullWidth
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                label="Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" type="submit">
            Search
          </Button>
        </form>
      </Container>
      <Container>
        <Grid container spacing={2}>
          {events.map(event => (
            <Grid item xs={12} sm={6} key={event._id}>
              <EventCard
                id={event._id}
                name={event.name}
                description={event.description}
                location={event.location}
                dateAndTime={event.dateAndTime}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default SearchPage;
