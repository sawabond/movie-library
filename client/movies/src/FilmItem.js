import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
function FilmItem(props) {
  const { film, setFilm } = props;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setFilm(film);
  };
  const listItemStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f2f2f2',
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
    transition: '0.3s',
    marginBottom: '20px',
    position: 'relative', // needed for absolute positioning of action-icons
    cursor: 'pointer', // change cursor on hover
  };

  const titleStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '10px 0',
  };

  const ratingStyles = {
    fontSize: '18px',
    fontWeight: 'bold',
    color: film.imdbRating >= 8 ? 'green' : 'black',
    marginBottom: '10px',
  };

  const releaseDateStyles = {
    fontSize: '18px',
    marginBottom: '10px',
  };

  const actionIconsStyles = {
    display: isHovered ? 'flex' : 'none',
    position: 'absolute',
    top: '10px',
    right: '10px',
  };

  return (
    <li
      style={listItemStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={actionIconsStyles} className="action-icons">
        <DeleteIcon />
        <div className="update-button" onClick={handleClick}>
          <Link to={'/update'}>
            <EditIcon />
          </Link>
        </div>
      </div>
      <h1 style={{ fontSize: '18px', marginBottom: '10px' }}>
        {film.isSeries ? 'Series' : 'Movie'}
      </h1>
      <h2 style={titleStyles}>{film.name}</h2>
      <p style={ratingStyles}>{film.imdbRating}</p>
      <p style={releaseDateStyles}>Release Date: {film.year}</p>
    </li>
  );
}

export default FilmItem;
