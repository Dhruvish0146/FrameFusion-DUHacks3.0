import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signUp';
import Navbar from './components/navbar';
import Logout from './components/logout';



function App() {
  // const user = useSelector((state)=> state.user._id);
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
