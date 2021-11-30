import { useState } from 'react';
import Home from './components/pages/home/Home';
import AuthPage from './components/pages/authPage/AuthPage';
import { Routes, Route } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="home/:userId" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
