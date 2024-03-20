import React from 'react';

const UserProfile = ({username, profilePicUrl, profilePicInput, onProfilePicChange, onSetProfilePic}) => (
    <div className="user-profile">
        <h2>Welcome, {username}!</h2>
        <div>
            <img src={profilePicUrl || 'default-avatar.png'} alt="Profile"
                 style={{width: '100px', height: '100px', borderRadius: '50%'}}/>
            <input
                placeholder="Profile picture URL"
                value={profilePicInput}
                onChange={onProfilePicChange}
            />
            <button onClick={onSetProfilePic}>Set Profile Picture</button>
        </div>
    </div>
);

export default UserProfile;
