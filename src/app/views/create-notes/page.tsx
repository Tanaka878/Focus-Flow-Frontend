import React, { useState } from 'react';

const CreateNote = () => {
  const [ownerEmail, setOwnerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noteData = {
      ownerEmail,
      notes,
    };

    try {
      const response = await fetch('http://localhost:8822/api/projects/saveNotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(noteData),
      });

      if (response.ok) {
        setMessage('Note created successfully!');
        setOwnerEmail('');
        setNotes('');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to create note'}`);
      }
    } catch (error) {
        console.log('Error creating note:', error);
      setMessage( 'Failed to create note');
    }
  };

  return (
    <div>
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Owner Email:
            <input
              type="email"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Notes:
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
              rows={5}
              cols={40}
            />
          </label>
        </div>
        <button type="submit">Create Note</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateNote;
