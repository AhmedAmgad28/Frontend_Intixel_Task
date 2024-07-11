import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const EventCard = ({ id, name, description, location, dateAndTime }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${id}`);
  };

  return (
    <Card sx={{ maxWidth: 500, width: '100%' }}>
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          height="180"
          image="https://i.pinimg.com/564x/b0/14/0a/b0140a5d6367212abbba98989caa9581.jpg"
          alt={name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Typography variant="body2" color="primary">
              {location}
            </Typography>
            <Typography variant="body2" color="primary">
              {new Date(dateAndTime).toLocaleString()}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventCard;
