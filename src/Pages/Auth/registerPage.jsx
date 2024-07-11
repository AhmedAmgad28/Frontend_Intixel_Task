import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../styles/registerPage.css';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('customer');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('male');
    const [profilePictureURL, setProfilePictureURL] = useState('');
    const [country] = useState('Egypt');
    const [city, setCity] = useState('');
    const [validated, setValidated] = useState(false);
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const cities = [
        "New Valley", "Matruh", "Red Sea", "Giza", "South Sinai", "North Sinai", "Suez", 
        "Beheira", "Helwan", "Sharqia", "Dakahlia", "Kafr el-Sheikh", "Alexandria", 
        "Monufia", "Minya", "Gharbia", "Faiyum", "Qena", "Asyut", "Sohag"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        } else {
            try {
                const userData = {
                    name,
                    email,
                    password,
                    role,
                    age,
                    gender,
                    profilePictureURL,
                    country,
                    city
                };
                await register(userData);
                navigate('/');
            } catch (error) {
                console.error('Registration failed', error);
            }
        }
        setValidated(true);
    };
  
    return (
        <div className="bg">
            <div className="center-container">
                <div className="transparent-container">
                    <h2>Register to EventMasters</h2>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    required
                                    minLength="8"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Name must be at least 8 characters long.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomRole">
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="customer">Customer</option>
                                    <option value="organizer">Organizer</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select a role.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    required
                                    minLength="8"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Password must be at least 8 characters long.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomAge">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter age"
                                    required
                                    min="16"
                                    max="100"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Age must be between 16 and 100.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select a gender.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustomProfilePictureURL">
                                <Form.Label>Profile Picture URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter profile picture URL"
                                    pattern=".*\.(jpg|jpeg|png)$"
                                    value={profilePictureURL}
                                    onChange={(e) => setProfilePictureURL(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid URL ending with .jpg, .jpeg, or .png.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="6" controlId="validationCustomCountry">
                                <Form.Label>Country</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={country}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group as={Col} md="6" controlId="validationCustomCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    as="select"
                                    required
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                >
                                    <option value="">Select a city</option>
                                    {cities.map((city, index) => (
                                        <option key={index} value={city}>{city}</option>
                                    ))}
                                </Form.Control>
                                <Form.Control.Feedback type="invalid">
                                    Please select a city.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
