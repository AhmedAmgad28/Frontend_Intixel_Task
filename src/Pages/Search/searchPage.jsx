import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import EventCard from '../../Components/eventCard';
import '../../styles/searchPage.css';

const SearchPage = () => {
    const [name, setName] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [events, setEvents] = useState([]);
    const [validated, setValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                const response = await fetch(`http://localhost:5000/api/events/search?name=${name}&organizer=${organizer}&location=${location}&date=${date}`);
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.error('Search failed', error);
            }
        }
        setValidated(true);
    };

    return (
        <div className="bg">
            <div className="center-container">
                <div className="transparent-container">
                    <h2>Search Events</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomOrganizer">
                                <Form.Label>Organizer</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter organizer name"
                                    value={organizer}
                                    onChange={(e) => setOrganizer(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomLocation">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter event location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomDate">
                                <Form.Label>Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                />
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Form>
                </div>
                <div className="results-container">
                    {events.map(event => (
                        <EventCard
                            key={event._id}
                            id={event._id}
                            name={event.name}
                            description={event.description}
                            location={event.location}
                            dateAndTime={event.dateAndTime}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
