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
  const [event, setEvent] = useState(null);
  const [isAttending, setIsAttending] = useState(false);
  const { eventID } = useParams();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventID}`);
        setEvent(response.data);
        if (user) {
          setIsAttending(response.data.attendees.some(attendee => attendee.id === user.id));
        }
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventID, user]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axios.delete(`http://localhost:5000/api/events/${eventID}`, {
          headers: { 'x-auth-token': token }
        });
        navigate('/');
      } catch (error) {
        console.error('Failed to delete event:', error);
      }
    }
  };

  const handleAttend = async () => {
    try {
      if (isAttending) {
        await axios.delete(`http://localhost:5000/api/events/${eventID}/attend`, {
          headers: { 'x-auth-token': token }
        });
      } else {
        await axios.post(`http://localhost:5000/api/events/${eventID}/attend`, {}, {
          headers: { 'x-auth-token': token }
        });
      }
      setIsAttending(!isAttending);
    } catch (error) {
      console.error('Failed to update attendance:', error);
    }
  };

  if (!event) return <div>Loading event details...</div>;

  return (
    <Container className="event-details-page">
      <h2>Event Details</h2>
      <Card>
        <Card.Img
          variant="top"
          src={event.imageURL || "https://i.pinimg.com/564x/b0/14/0a/b0140a5d6367212abbba98989caa9581.jpg"}
          alt="Event"
        />
        <Card.Body>
          <Box display="flex" alignItems="center">
            <Card.Title>{event.name}</Card.Title>
            {user && user.role === 'organizer' && user.id === event.organizerID.id && (
              <Box ml={2}>
                <IconButton onClick={() => navigate(`/events/${eventID}/update`)}>
                  <Edit />
                </IconButton>
                <IconButton onClick={handleDelete}>
                  <Delete />
                </IconButton>
              </Box>
            )}
            {user && user.role === 'customer' && (
              <IconButton onClick={handleAttend}>
                {isAttending ? <EventBusy /> : <EventAvailable />}
              </IconButton>
            )}
          </Box>
          <Card.Subtitle className="mb-2 text-muted">
            Organized by: {event.organizerID.name}
          </Card.Subtitle>
          <Card.Text>{event.description}</Card.Text>
          <Card.Text>Location: {event.location}</Card.Text>
          <Card.Text>Date and Time: {new Date(event.dateAndTime).toLocaleString()}</Card.Text>
        </Card.Body>
      </Card>
      <h3>Comments</h3>
      <CommentSection eventID={eventID} />
      {user && user.role === 'organizer' && <AttendeesSection attendees={event.attendees} />}
    </Container>
  );
};

export default EventDetailsPage;
