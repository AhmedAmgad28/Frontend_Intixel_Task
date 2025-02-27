import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import '../../styles/newEventPage.css';

const NewEventPage = () => {
  // Define state variables for form fields and validation
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [dateAndTime, setDateAndTime] = useState('');
  const [validated, setValidated] = useState(false); // State for storing validation status
  const { token } = useContext(AuthContext); // Get token from AuthContext
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation(); // Stop further propagation if form is invalid
    } else {
      try {
        const newEvent = {
          name,
          description,
          location,
          dateAndTime,
        };
        // Make POST request to create new event
        await axios.post('http://localhost:5000/api/events', newEvent, {
          headers: {
            'x-auth-token': token,
          },
        });
        navigate('/'); // Navigate to home page on success
      } catch (error) {
        console.error('Failed to create event', error);
      }
    }
    setValidated(true); // Set form validation state
  };

  return (
    <div className="bg">
      <div className="center-container">
        <div className="transparent-container">
          <h2>Create New Event</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomName">
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid event name.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomLocation">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event location"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid location.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomDateAndTime">
                <Form.Label>Date and Time</Form.Label>
                <Form.Control
                  type="datetime-local"
                  required
                  value={dateAndTime}
                  onChange={(e) => setDateAndTime(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid date and time.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Create Event
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewEventPage;
