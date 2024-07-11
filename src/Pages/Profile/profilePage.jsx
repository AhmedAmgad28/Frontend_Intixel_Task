import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleUpdateProfile = () => {
        navigate('/profile/update');
    };

    return (
        <div>
            <button onClick={handleUpdateProfile}>Update Profile</button>
        </div>
    );
};

export default ProfilePage;