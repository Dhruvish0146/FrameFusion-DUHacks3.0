import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signUp';
import Navbar from './components/navbar';
import {jwtDecode} from 'jwt-decode';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector((state)=>state.token);
  const user = jwtDecode(token);
  console.log(user);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
