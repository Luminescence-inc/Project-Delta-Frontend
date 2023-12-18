/** @format */

import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Footer from 'components/Footer/Footer';
import Navbar from 'components/Navbar/Navbar';
import Home from 'pages/Home/Home';
import Onboarding from 'pages/Onboarding/Onboarding';
import Login from 'pages/Authentication/Login/Login';
import ForgotPassword from 'pages/Authentication/ForgotPassword/ForgotPassword';
import ForgotPasswordFinal from 'pages/Authentication/ForgotPassword/ForgotPasswordFinal';
import Signup from 'pages/Authentication/Signup/Signup';
import ViewBusiness from 'pages/Home/Business/ViewBusiness';
import Email from 'pages/Authentication/ForgotPassword/Email';
import VerifiedEmail from 'pages/Authentication/Verification/VerifiedEmail';
import VerifiedAccount from 'pages/Authentication/Verification/VerifyAccount';
import RegisterBusiness from 'pages/Authentication/Signup/RegisterBusiness/RegisterBusiness';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id='app-container'>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/onboarding' element={<Onboarding />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password/reset/:userId/:uniqueString' element={<ForgotPassword />} />
          <Route path='/verify-email/:userId/:uniqueString' element={<VerifiedEmail />} />
          <Route path='/verify-account' element={<VerifiedAccount />} />
          <Route path='/forgot-password/email' element={<Email />} />
          <Route path='/forgot-password-final' element={<ForgotPasswordFinal />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signup/register-business' element={<RegisterBusiness />} />
          <Route path='/view-your-business' element={<ViewBusiness />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
