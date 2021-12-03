import { useState } from 'react';
import Home from './components/pages/home/Home';
import AuthPage from './components/pages/authPage/AuthPage';
import { Routes, Route, Navigate } from 'react-router-dom';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './App.scss';

import { auth } from './serviсes/firebase';

function App() {
  const [isAuthUser, setIsAuthUser] = useState<any>(null);
  

  auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setIsAuthUser(authUser);
    } else {
      setIsAuthUser(null);
    }
  });

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthPage />} />
        {isAuthUser ? (
          <Route path="home/:userId" element={<Home />} />
        ) : (
          <Route path="*" element={<Navigate replace to="/" />} />
        )}
        {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
      </Routes>
    </div>
  );
}

export default App;
