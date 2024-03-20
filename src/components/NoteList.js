import React from 'react';

function NoteList({ notes, removeNote }) {
    return (
        <div>
            <h2>Notes</h2>
            <ol>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note.content}
                        <button onClick={() => removeNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default NoteList;
