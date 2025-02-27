import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../Components/eventCard';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import '../styles/homePage.css';

const HomePage = () => {
  const [events, setEvents] = useState([]); // State to store upcoming events
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        const allEvents = response.data;

        // Filter out past events and sort them by date
        const upcomingEvents = allEvents.filter(event => new Date(event.dateAndTime) > new Date())
                                         .sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

        setEvents(upcomingEvents); // Update state with upcoming events
      } catch (error) {
        console.error('Failed to fetch events:', error); // Log any errors
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container className="homepage-container">
      <Container className="search-bar-container">
        <TextField
          variant="outlined"
          label="Search Events"
          fullWidth
          onClick={() => navigate('/search')} // Navigate to search page on click
        />
      </Container>
      <Container>
        <h1>Upcoming Events</h1>
        <Grid container spacing={2}>
          {events.map(event => (
            <Grid item xs={12} sm={9} md={6} key={event._id}>
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

export default HomePage;
