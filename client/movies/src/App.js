import { Route, Routes } from 'react-router-dom';
import LoginForm from './LoginForm';
import Main from './Main';
import Admin from './Admin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/main" element={<Main />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
