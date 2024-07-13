import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { Container, TextField, Button, Typography, Paper } from '@mui/material';
import '../../styles/updateProfilePage.css';

const UpdateProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);  // Get user context
  const [formData, setFormData] = useState({  // State for form data
    name: user.name || '',
    email: user.email || '',
    age: user.age || '',
    gender: user.gender || '',
    profilePictureURL: user.profilePictureURL || '',
    country: user.country || '',
    city: user.city || '',
  });
  const [errors, setErrors] = useState({}); // State for form errors
  const navigate = useNavigate(); // Hook to navigate between routes

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission for updating profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data (using your backend validation rules as a guide)
    const newErrors = {};
    if (formData.name.length < 8) newErrors.name = 'Name must be at least 8 characters long';
    if (!/\.(jpg|jpeg|png)$/.test(formData.profilePictureURL)) newErrors.profilePictureURL = 'Profile picture must end with .png or .jpg';
    if (formData.age < 16 || formData.age > 100) newErrors.age = 'Age must be between 16 and 100';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (response.ok) {
        setUser(result); // Update user context with new profile data
        // Pass a state parameter to indicate that the profile was updated
        navigate('/profile', { state: { updated: true } });
      } else {
        setErrors(result.errors || {});
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <Container>
      <Paper className="update-profile-container">
        <Typography variant="h5">Update Profile</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
          <TextField
            fullWidth
            margin="normal"
            label="Age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Profile Picture URL"
            name="profilePictureURL"
            value={formData.profilePictureURL}
            onChange={handleChange}
            error={!!errors.profilePictureURL}
            helperText={errors.profilePictureURL}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="City"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateProfilePage;
