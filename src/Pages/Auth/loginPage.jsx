import React, { useState, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../../styles/loginPage.css';

const LoginPage = () => {
  // State to store email and password inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // State to handle form validation
  const [validated, setValidated] = useState(false);
  // Access the login function from AuthContext
  const { login } = useContext(AuthContext);
  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const form = e.currentTarget; // Get the current form element
    if (form.checkValidity() === false) {
      e.stopPropagation(); // Stop the propagation if form is invalid
    } else {
      try {
        // Attempt to log in using the provided email and password
        await login(email, password);
        navigate('/'); // Navigate to the homepage on successful login
      } catch (error) {
        console.error('Login failed', error); // Log any errors that occur during login
      }
    }
    setValidated(true); // Set the form validation state to true
  };

  return (
    <div className="bg">
      <div className="center-container">
        <div className="transparent-container">
          <h2>Welcome to EventMasters</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state on change
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustomPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state on change
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
