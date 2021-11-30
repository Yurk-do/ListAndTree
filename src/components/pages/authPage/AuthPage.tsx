import { useState } from 'react';
import AuthForm from '../../forms/authForm/AuthForm';

import { useNavigate } from 'react-router-dom';

import { Button } from 'primereact/button';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import './authPage.scss';

type AuthFormData = {
  email: string;
  password: string;
};

const AuthPage = () => {
  const auth = getAuth();

  const navigate = useNavigate();
  const authFormTypes = {
    login: 'login',
    registration: 'registration',
  };

  const formInputsData = [
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
  ];

  const [authFormType, setAuthFormType] = useState(authFormTypes.login);

  const authenticate = (authFormData: AuthFormData) => {
    signInWithEmailAndPassword(auth, authFormData.email, authFormData.password)
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        const userId = userCredential.user.uid;
        if (userEmail) {
          localStorage.setItem('userEmail', userEmail);
        }
        if (userId) {
          localStorage.setItem('userId', userId);
        }
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  const registerUser = (authFormData: any) => {
    createUserWithEmailAndPassword(
      auth,
      authFormData.email,
      authFormData.password
    )
      .then((userCredential) => {
        const userEmail = userCredential.user.email;
        const userId = userCredential.user.uid;
        if (userEmail) {
          localStorage.setItem('userEmail', userEmail);
        }
        if (userId) {
          localStorage.setItem('userId', userId);
        }
        navigate(`/home/${userId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Login Page</h1>
      {authFormType === authFormTypes.login && (
        <>
          <Button
            className="p-button-text"
            label="Открыть форму регистрации"
            onClick={() => setAuthFormType(authFormTypes.registration)}
          />
          <AuthForm
            formName="Вход в систему"
            inputsData={formInputsData}
            sendLoginData={authenticate}
            buttonName="Войти в систему"
          />
        </>
      )}
      {authFormType === authFormTypes.registration && (
        <>
          <Button
            className="p-button-text"
            label="Открыть форму входа в систему"
            onClick={() => setAuthFormType(authFormTypes.login)}
          />
          <AuthForm
            formName="Регистрация"
            inputsData={formInputsData}
            sendLoginData={registerUser}
            buttonName="Зарегитрироваться"
          />
        </>
      )}
    </div>
  );
};

export default AuthPage;
