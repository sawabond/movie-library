import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Main from './Main';
import Admin from './Admin';
import AddFilmForm from './AddFilmForm';
import UpdateFilmForm from './UpdateFilmForm';

function App() {
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
        <Route path="/main" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add" element={<AddFilmForm />} />
        <Route path="/update" element={<UpdateFilmForm />} />
      </Routes>
    </div>
  );
}

export default App;
