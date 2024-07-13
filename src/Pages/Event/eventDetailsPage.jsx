import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { Container, IconButton, Box} from '@mui/material';
import { Edit, Delete, EventAvailable, EventBusy } from '@mui/icons-material';
import CommentSection from '../../Components/commentSection';
import AttendeesSection from '../../Components/attendeesSection';
import { AuthContext } from '../../Context/AuthContext';
import '../../styles/eventDetailsPage.css';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null); // State for storing event details
  const [isAttending, setIsAttending] = useState(false); // State for storing attendance status
  const { eventID } = useParams(); // Get event ID from URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const { user, token } = useContext(AuthContext); // Get user and token from AuthContext

  useEffect(() => {
    // Fetch event details when component mounts or eventID/user changes
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventID}`);
        setEvent(response.data); // Set event details in state
        if (user) {
          // Check if the user is attending the event
          setIsAttending(response.data.attendees.some(attendee => attendee.id === user.id));
        }
      } catch (error) {
        console.error('Failed to fetch event details:', error); // Log error if fetch fails
      }
    };

    fetchEventDetails();
  }, [eventID, user]);

  const handleDelete = async () => {
    // Handle event deletion
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventID}`, {
          headers: { 'x-auth-token': token } // Include authentication token in headers
        });
        navigate('/'); // Navigate to homepage after deletion
      } catch (error) {
        console.error('Failed to delete event:', error); // Log error if deletion fails
      }
    }
  };

  const handleAttend = async () => {
    // Handle attendance toggle
    try {
      if (isAttending) {
        await axios.delete(`http://localhost:5000/api/events/${eventID}/attend`, {
          headers: { 'x-auth-token': token } // Include authentication token in headers
        });
      } else {
        await axios.post(`http://localhost:5000/api/events/${eventID}/attend`, {}, {
          headers: { 'x-auth-token': token } // Include authentication token in headers
        });
      }
      setIsAttending(!isAttending); // Toggle attendance state
    } catch (error) {
      console.error('Failed to update attendance:', error); // Log error if attendance update fails
    }
  };

  if (!event) return <div>Loading event details...</div>; // Show loading message if event data is not loaded

  return (
    <Container className="event-details-page">
      <h2>Event Details</h2>
      <Card>
        <Card.Img
          variant="top"
          src={event.imageURL || "https://i.pinimg.com/564x/b0/14/0a/b0140a5d6367212abbba98989caa9581.jpg"}
          alt="Event" // Display event image or a default image if not available
        />
        <Card.Body>
          <Box display="flex" alignItems="center">
            <Card.Title>{event.name}</Card.Title>
            {user && user.role === 'organizer' && user.id === event.organizerID.id && (
              <Box ml={2}>
                <IconButton onClick={() => navigate(`/events/${eventID}/update`)}>
                  <Edit /> {/* Edit icon button for organizers */}
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <Delete /> {/* Delete icon button for organizers */}
                </IconButton>
              </Box>
            )}
            {user && user.role === 'customer' && (
              <IconButton onClick={handleAttend}>
                {isAttending ? <EventBusy /> : <EventAvailable />} {/* Toggle attendance icon */}
              </IconButton>
            )}
          </Box>
          <Card.Subtitle className="mb-2 text-muted">
            Organized by: {event.organizerID.name} {/* Display organizer name */}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text> {/* Display event description */}
          <Card.Text>Location: {event.location}</Card.Text> {/* Display event location */}
          <Card.Text>Date and Time: {new Date(event.dateAndTime).toLocaleString()}</Card.Text> {/* Display event date and time */}
        </Card.Body>
      </Card>
      <h3>Comments</h3>
      <CommentSection eventID={eventID} /> {/* Comment section component */}
      {user && user.role === 'organizer' && <AttendeesSection attendees={event.attendees} />} {/* Attendees section for organizers */}
    </Container>
  );
};

export default EventDetailsPage; // Export EventDetailsPage component
