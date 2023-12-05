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
import BusinessProfile from 'pages/Authentication/Signup/BusinessProfile';
import OperationInfo from 'pages/Authentication/Signup/OperationInfo';

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
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/forgot-password-final'
            element={<ForgotPasswordFinal />}
          />
          <Route path='/signup' element={<Signup />} />
          <Route
            path='/signup/business-profile'
            element={<BusinessProfile />}
          />
          <Route path='/signup/operation-info' element={<OperationInfo />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
