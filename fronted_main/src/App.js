import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';

import Errror from './components/Errror';
import {Routes,Route} from "react-router-dom"
import Register from './components/Register';
import PostInvestor from './components/Investor/PostInvestor';
import About from './components/About';
import ProfileInvestor from './components/Investor/ProfileInvestor';
import Header from './components/Navbar/Header';
import ProfileInvestorWrapper from './components/Investor/ProfileInvestorWrapper';

function App() {
  return (
  <>
  

{/* <Header/>    */}
 {/* <Home/> */}
    <Routes>

      <Route path='/Home' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/Register' element={<Register />} />
      <Route path='/PostInvestor' element={<PostInvestor />} />
      <Route path='/ProfileInvestorWrapper' element={<ProfileInvestorWrapper/>} />
      <Route path='/ProfileInvestor' element={<ProfileInvestor />} />

      <Route path='/About' element={<About />} />
   

      <Route path='*' element={<Errror />} />
    </Routes>
  </>
  );
}

export default App;