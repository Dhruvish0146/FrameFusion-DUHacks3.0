import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signUp';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
