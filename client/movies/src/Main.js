import React, { useState, useEffect } from 'react';
import FilmItem from './FilmItem';
import { Link as RouterLink } from 'react-router-dom';
import { Button } from '@material-ui/core';
import axios from 'axios';
function Main() {
  const [searchTerm, setSearchTerm] = useState('');
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const token = localStorage.getItem('token');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  useEffect(() => {
    const fetchFilms = async () => {
      axios
        .get(
          `http://localhost:5100/films?stwith=${searchTerm}&page=${page}&limit=6`
        )
        .then((res) => {
          console.log(res.data);
          setFilms(res.data.data);
          setTotalPages(res.data.totalPages);
        })
        .catch((err) => console.warn(err));
    };
    fetchFilms();
  }, [searchTerm, page]);

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f2f2f2',
    borderRadius: '10px',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    marginBottom: '20px',
  };

  const titleStyles = {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: '20px 0',
  };

  const searchInputStyles = {
    padding: '10px',
    borderRadius: '10px',
    border: 'none',
    marginBottom: '20px',
    fontSize: '18px',
    width: '20%',
  };

  const buttonStyles = {
    padding: '10px 20px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    transition: '0.3s',
    marginLeft: '10px',
  };

  return (
    <div style={containerStyles}>
      <h1 style={titleStyles}>Film Library</h1>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          style={searchInputStyles}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {token && (
          <Button
            component={RouterLink}
            to="/add"
            variant="contained"
            color="primary"
            style={{ width: '80%' }}
          >
            Add Film
          </Button>
        )}

        <ul
          style={{
            listStyleType: 'none',
            padding: '0px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '5%',
            justifyContent: 'center',
          }}
        >
          {films?.map((film) => (
            <FilmItem
              key={film.id}
              film={film}
              films={films}
              setFilms={setFilms}
            />
          ))}
        </ul>
      </div>
      <div>
        {page > 1 && (
          <button
            onClick={() => handlePageChange(page - 1)}
            style={buttonStyles}
          >
            Previous
          </button>
        )}
        {page < totalPages && (
          <button
            onClick={() => handlePageChange(page + 1)}
            style={buttonStyles}
          >
            Next
          </button>
        )}
      </div>
      <div
        className="create-film"
        style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}
      ></div>
    </div>
  );
}

export default Main;
