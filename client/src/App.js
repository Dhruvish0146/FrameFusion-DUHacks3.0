import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signUp';
import Navbar from './components/navbar';
import Logout from './components/logout';
import ProfileArtist from './components/profileArtist';
import AddArt from './components/addArt';
import EditProfile from './components/editProfile';
import Footer from './components/footer';
import ArtPage from './components/artPage';
import ProfileUser from './components/ProfileUser/profileUser';


function App() {
  return (
    <>
      <Navbar />
      
      <div >
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path='/profile/artist/:userId' element={<ProfileArtist />} />
          <Route path='/profile/user/:userId' element={<ProfileUser />} />
          <Route path='/art/:artId' element={<ArtPage />} />
          <Route path='/addArt' element={<AddArt />} />
          <Route path='/editProfile' element={<EditProfile />} />
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
