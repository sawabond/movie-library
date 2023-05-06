import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Main from './Main';
import Admin from './Admin';
import AddFilmForm from './AddFilmForm';
import UpdateFilmForm from './UpdateFilmForm';
import { useState } from 'react';

function App() {
  const [film, setFilm] = useState();
  return (
    <div
      className="App"
      style={{
        width: '100%',
        height: '90vh',
      }}
    >
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/main" element={<Main film={film} setFilm={setFilm} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddFilmForm />} />
        <Route
          path="/update"
          element={<UpdateFilmForm film={film} setFilm={setFilm} />}
        />
      </Routes>
    </div>
  );
}

export default App;
