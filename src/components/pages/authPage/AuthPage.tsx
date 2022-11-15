import { useState } from 'react';
import AuthForm from '../../forms/authForm/AuthForm';
import NotificationWindow from '../../notificationWindow/NotificationWindow';

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

  const [notificationWindowData, setNotificationWindowData] = useState({
    message: '',
    status: false,
    isError: false,
  });

  const authFormTypes = {
    login: 'login',
    registration: 'registration',
  };

  const formInputsData = [
    { name: 'email', type: 'email' },
    { name: 'password', type: 'password' },
  ];

  const [authFormType, setAuthFormType] = useState(authFormTypes.login);

  const errorHandler = (error: any) => {
    setNotificationWindowData({
      message: error.message,
      status: true,
      isError: true,
    });
    setTimeout(() => {
      setNotificationWindowData({
        ...notificationWindowData,
        status: false,
      });
    }, 4000);
  };

  const userCredentialHandler = (userCredential: any) => {
    const userId = userCredential.user.uid;
    navigate(`/home/${userId}`);
  };

  const loginIn = (authFormData: AuthFormData) => {
    signInWithEmailAndPassword(auth, authFormData.email, authFormData.password)
      .then((userCredential) => userCredentialHandler(userCredential))
      .catch((error) => errorHandler(error));
  };

  const registerUser = (authFormData: AuthFormData) => {
    createUserWithEmailAndPassword(
      auth,
      authFormData.email,
      authFormData.password
    )
      .then((userCredential) => userCredentialHandler(userCredential))
      .catch((error) => errorHandler(error));
  };

  console.log('test');

  return (
    <div>
      <h1>Auth Page</h1>
      {notificationWindowData.status && (
        <NotificationWindow
          isError={notificationWindowData.isError}
          notificationMessage={notificationWindowData.message}
        />
      )}
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
            sendLoginData={loginIn}
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
