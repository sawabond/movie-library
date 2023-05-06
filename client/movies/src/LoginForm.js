import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    axios
      .post('http://localhost:5100/login', {
        username: username,
        password: password,
      })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location.replace('/main');
      })
      .catch((err) => alert('Unable to login you'));

    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <label
        style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}
      >
        Username:
        <input
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label
        style={{ marginBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}
      >
        Password:
        <input
          style={{
            marginLeft: '10px',
            padding: '5px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '16px',
          }}
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <button
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          borderRadius: '5px',
          border: 'none',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
        type="submit"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;
