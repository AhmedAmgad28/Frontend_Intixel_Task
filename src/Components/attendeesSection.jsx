import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Avatar, Card, CardContent, Typography } from '@mui/material';
import { AuthContext } from '../Context/AuthContext'; // Adjust the path to where your AuthProvider is located
import '../styles/attendeesSection.css';

const AttendeesSection = ({ attendees }) => {
  const [attendeeDetails, setAttendeeDetails] = useState([]);
  const { token } = useContext(AuthContext); // Use context to get the token

  useEffect(() => {
    const fetchAttendeeDetails = async () => {
      try {
        if (!attendees || attendees.length === 0) {
          console.warn('No attendees found');
          return;
        }

        const promises = attendees.map(async (id) => {
          try {
            const response = await axios.get(`http://localhost:5000/api/users/${id}`, {
              headers: {
                'x-auth-token': token, // Include the token in the request headers
              },
            });
            return response.data;
          } catch (error) {
            console.error(`Failed to fetch details for attendee ID ${id}:`, error);
            return null; // Return null if an attendee could not be fetched
          }
        });

        const details = await Promise.all(promises);
        setAttendeeDetails(details.filter(detail => detail));
      } catch (error) {
        console.error('Failed to fetch attendee details:', error);
      }
    };

    fetchAttendeeDetails();
  }, [attendees, token]); // Include token in dependency array

  return (
    <div>
      <h3>Attendees</h3>
      {attendeeDetails.length > 0 ? (
        attendeeDetails.map((attendee) => (
          <Card key={attendee._id} className="attendee-card">
            <CardContent>
              <div className="attendee-header">
                <Avatar src={attendee.profilePictureURL} alt={attendee.name} />
                <div className="attendee-info">
                  <Typography variant="h6">{attendee.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{attendee.email}</Typography>
                  <Typography variant="body2" color="textSecondary">{attendee.gender}, {attendee.age}</Typography>
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography>No attendees found</Typography>
      )}
    </div>
  );
};

export default AttendeesSection;
