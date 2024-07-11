import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import CommentSection from '../../Components/commentSection';
import Container from '@mui/material/Container';
import '../../styles/eventDetailsPage.css';

const EventDetailsPage = () => {
  const [event, setEvent] = useState(null);
  const { eventID } = useParams();

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${eventID}`);
        setEvent(response.data);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventID]);

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
          <Card.Title>{event.name}</Card.Title>
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
    </Container>
  );
};

export default EventDetailsPage;
