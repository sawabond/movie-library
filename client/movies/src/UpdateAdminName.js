import { React, useState } from 'react';
import axios from 'axios';

function UpdateAdminName() {
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        'http://localhost:5100/my-name',
        {
          name,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
    } catch (error) {
      if (error.response.status === 403) {
        alert('Unauthorized');
      }
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem', textAlign: 'center' }}>Update Name</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1rem',
          }}
        >
          <span style={{ width: '6rem', fontWeight: 'bold' }}>New Name:</span>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            style={{
              marginLeft: '0.5rem',
              padding: '0.5rem',
              borderRadius: '4px',
              border: '1px solid #ccc',
            }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            background: '#0077cc',
            color: '#fff',
            border: 'none',
          }}
        >
          Update Name
        </button>
      </form>
    </div>
  );
}

export default UpdateAdminName;
