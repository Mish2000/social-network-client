import React from 'react';

function Feed({ feedNotes }) {
    return (
        <div className="feed-section">
            <h3>Feed</h3>
            {feedNotes && feedNotes.length > 0 ? (
                feedNotes.map((note, index) => (
                    <div key={note.id} className="feed-note">
                        {note.content ? note.content : "Empty content..."}
                        <span> - by {note.username}</span>
                    </div>
                ))
            ) : (
                <p>No feed notes available.</p>
            )}
        </div>
    );
}

export default Feed;
