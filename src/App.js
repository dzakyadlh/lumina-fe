import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import SignInPage from './pages/signin';
import SignUpPage from './pages/signup';
import HomePage from './pages/home';

function App() {
  return (
    <React.Fragment>
      <Routes>
        <Route path="landing" element={<Landing />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="home" element={<HomePage />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
