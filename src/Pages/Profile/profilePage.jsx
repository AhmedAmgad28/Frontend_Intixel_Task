import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Avatar, Paper } from '@mui/material';
import { AuthContext } from '../../Context/AuthContext';
import SimpleBackdrop from '../../Components/spinner';
import '../../styles/profilePage.css';

const ProfilePage = () => {
  const { user, token, logout, setUser } = useContext(AuthContext); // Get user and authentication context
  const [loading, setLoading] = useState(false); // State for loading spinner
  const [updated, setUpdated] = useState(false); // State to trigger profile update
  const navigate = useNavigate(); // Hook to navigate between routes

  // Fetch user profile when there's an update
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!updated) return; // Only fetch if there's an update

      try {
        const response = await fetch('http://localhost:5000/api/users/profile', {
          headers: {
            'x-auth-token': token,
          },
        });
        const userData = await response.json();
        setUser(userData); // Update user in AuthContext
        setUpdated(false); // Reset update state after fetching
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        logout(); // Handle logout if the user fetch fails
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [updated, token, logout, setUser]);

  // Handle navigation to update profile page
  const handleUpdateProfile = () => {
    navigate('/profile/update', { state: { fromProfile: true } });
  };

  if (loading) return <SimpleBackdrop />; // Show loading spinner if loading

  return (
    <Container>
      <Paper className="profile-container">
        <Avatar
          alt={user.name}
          src={user.profilePictureURL}
          sx={{ width: 120, height: 120, margin: '0 auto', border: '2px solid #ddd' }}
        />
        <Typography variant="h5" align="center" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>Email: {user.email}</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Gender: {user.gender}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Age: {user.age}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">Country: {user.country}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">City: {user.city}</Typography>
          </Grid>
        </Grid>
        <div className="profile-actions">
          <button className="update-button" onClick={handleUpdateProfile}>Update Profile</button>
        </div>
      </Paper>
    </Container>
  );
};

export default ProfilePage;
