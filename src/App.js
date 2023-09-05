import React, { useState,  useContext }  from "react";
import  {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './style/style.css'
import LoginPage from "./pages/LoginPage";
import { RegistrationPage } from './pages/RegistrationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import { EmailContext } from './pages/ConfirmationPage';
import HomePage from './pages/HomePage'

function App() {
    const [email, setEmail] = useState('');
          return (
              <EmailContext.Provider value={[email, setEmail]}>
                  <Routes>
                    <Route path='/' element={<LoginPage />} />
                    <Route path='/home-page' element={<HomePage />} />
                    <Route path='/new-password' element={<RegistrationPage />}/>
                    <Route path="/new-password/send-email-message" element={<ConfirmationPage />} />
                  </Routes>
              </EmailContext.Provider>
          );
}

export default App;
