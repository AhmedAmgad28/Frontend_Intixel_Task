import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import CommentCard from './commentCard';
import { AuthContext } from '../Context/AuthContext';
import '../styles/commentSection.css';

const CommentSection = ({ eventID }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/comments/event/${eventID}`);
        setComments(response.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [eventID]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/comments',
        { eventID, commentText },
        { headers: { 'x-auth-token': token } }
      );
      setComments((prevComments) => [...prevComments, response.data]);
      setCommentText('');
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };

  if (loading) return <div>Loading comments...</div>;

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <CommentCard
          key={comment._id}
          profilePictureURL={comment.userID.profilePictureURL}
          name={comment.userID.name}
          role={comment.userID.role}
          commentText={comment.commentText}
          createdAt={comment.createdAt}
        />
      ))}
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Write a comment..."
          required
        />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default CommentSection;
