import React from 'react';

function FollowedUsersList({followedUsers, unfollowUser}) {
    return (
        <div className="followed-users">
            <h3>Following</h3>
            <ul>
                {followedUsers.map((followedUser, index) => (
                    <li key={index}>
                        {followedUser.username}
                        <button onClick={() => unfollowUser(followedUser.id)}>Unfollow</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FollowedUsersList;
