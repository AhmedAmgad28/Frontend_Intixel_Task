import React from 'react';
import { Avatar, Typography, Card, CardContent } from '@mui/material';
import '../styles/commentCard.css';

const CommentCard = ({ profilePictureURL, name, role, commentText, createdAt }) => {
  return (
    <Card className="comment-card">
      <CardContent>
        <div className="comment-header">
          <Avatar src={profilePictureURL} alt={name} className="comment-avatar" />
          <div className="comment-user-info">
            <Typography variant="h6" className="comment-username">
              {name} <span className="comment-role">{role}</span>
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {new Date(createdAt).toLocaleString()}
            </Typography>
          </div>
        </div>
        <Typography variant="body1" className="comment-text">
          {commentText}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CommentCard;
