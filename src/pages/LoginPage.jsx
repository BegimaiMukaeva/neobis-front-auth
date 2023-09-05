import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Lorby from "../components/Lorby";

const LoginPage = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [retryTime, setRetryTime] = useState(null);

  useEffect(() => {
    let timer;
    if (retryTime && retryTime > 0) {
      timer = setTimeout(() => {
        setRetryTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (retryTime === 0) {
      setRetryTime(null);
      setLoginError(false);
      setLogin('');
      setPassword('');
    }
    return () => {
      clearTimeout(timer);
    };
  }, [retryTime]);


 const checkDatabase = async (login, password) => {
    try {
        const response = await fetch('/your-endpoint-for-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ login, password })
        });

        const data = await response.json();

        if (data.success) {
            return true;
        } else {
            setLoginError(true);
            setRetryTime(30);
            return false;
        }
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    }
};

const handleSignIn = async (e) => {
    e.preventDefault();

    if (await checkDatabase(login, password)) {
        navigate('/home-page');
    } else {
      setLoginError(true);
      setRetryTime(30);
    }
};


  // const handleSignIn = (e) => {
  //   e.preventDefault();
  //   if (checkDatabase(login, password)) {
  //     navigate('/successloginpage');
  //   } else {
  //     setLoginError(true);
  //     setRetryTime(30);
  //   }
  // };

  return (
      <div className='container'>
        <div className='lorby-page'>
          <div>
              <Lorby />
          </div>
          <div className='sign-in-modal'>
            <h2 className='welcome-back-text'>Вэлком бэк!</h2>
            <form onSubmit={handleSignIn}>
              <input
                className='sign-in-input'
                type="text"
                placeholder="Введи туда-сюда логин"
                value={login}
                onChange={e => setLogin(e.target.value)}
                required
              />
              <input
                className='sign-in-input sign-in-password'
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль (тоже введи)"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
             <button
              onClick={() => setShowPassword(!showPassword)}
              className={showPassword ? 'show-password' : 'dont-show-pass'}
              type="button"
              >
              </button>
              <button
                  type="submit"
                  disabled={retryTime !== null}
                  className={retryTime === null ? 'active' : 'not-active'}
              >
                  {loginError ? `Попробовать войти через 0:${retryTime}` : 'Войти'}
              </button>
            </form>
            {loginError && <div className='dont-find-message'>Неверный логин или пароль</div>}
            <Link to='/new-password' className={'have-not-user'}>
                У меня еще нет аккаунта
            </Link>
          </div>
        </div>
    </div>
  );
}

export default LoginPage;
