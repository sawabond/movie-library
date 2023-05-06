import React from 'react';
import axios from 'axios';

function DeleteAllFilmsButton() {
  const handleDeleteClick = async () => {
    try {
      await axios.delete('http://localhost:5100/films', {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
    } catch (error) {
      if (error.response.status === 403) {
        alert('Unauthorized');
      }
    }
  };

  return (
    <button
      style={{
        backgroundColor: '#F44336',
        color: '#FFFFFF',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
      onClick={handleDeleteClick}
    >
      DELETE ALL FILMS TO FOLLOW ACCEPTION CRITERIAS
    </button>
  );
}

export default DeleteAllFilmsButton;
