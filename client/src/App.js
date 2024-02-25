import { Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import SignUp from './components/signUp';
import Navbar from './components/navbar';
import Logout from './components/logout';
import ProfileArtist from './components/profileArtist';
import AddArt from './components/addArt';
// import EditProfile from './components/editProfile';
// import Footer from './components/footer';

import ProfileUser from './components/ProfileUser/profileUser';
import ArtPage from './components/ArtPage/artPage';
import CheckoutPage from './components/Checkout/checkout';
import Orders from './components/OrdersPage/order';
import EditProfileArtist from './components/ProfileArtist/profileArtist';



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
          <Route path='/checkout/:artId' element={<CheckoutPage />} />
          <Route path='/addArt' element={<AddArt />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/editProfile' element={<EditProfileArtist />} />
        </Routes>
      </div>
      {/* <Footer/> */}
    </>
  );
}

export default App;
