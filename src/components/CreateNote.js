import React from 'react';

function CreateNote({ newNote, onValueChange, saveNote }) {
    return (
        <div className="create-note-section">
            <input
                placeholder="Enter new note"
                value={newNote}
                onChange={onValueChange}
            />
            <button onClick={saveNote} disabled={!newNote.trim()}>Save</button>
        </div>
    );
}

export default CreateNote;
