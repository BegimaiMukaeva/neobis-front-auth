import React, { useState, useEffect, useMemo, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Lorby from "../components/Lorby";
import { EmailContext } from './ConfirmationPage';
import BackImg from '../img/Frame 851211998.svg'
import axios from 'axios';



  const RegistrationPage = () => {
    const [email, setEmail] = useContext(EmailContext);

    const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordValidations = {
    length: password.length >= 8 && password.length <= 15,
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
    digits: /\d/.test(password),
    specialChars: /[\W_]/.test(password),
    match: password === confirmPassword
  };

    const handleSubmit = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      const response = await axios.post('http://ishak-backender.org.kg/auth/profile/', {
       email,
       password,
       password2: confirmPassword
    }, {
       headers: {
         'Content-Type': 'application/json',
         'accept': 'application/json',
       }
    });


      if (response.status === 200) {
        navigate('/new-password/send-email-message', { state: { email } });
      } else {
        setError("Произошла ошибка при регистрации.");
      }

    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Ошибка сервера при регистрации.");
      } else if (error.request) {
        setError("Сервер не отвечает.");
      } else {
        setError("Ошибка при создании запроса.");
      }
    }
  };


    const isValidEmail = (email) => {
      const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      return regex.test(email);
    }

    const isButtonDisabled = !isValidEmail(email) || !login || !password || !confirmPassword || (password !== confirmPassword);

    const validateInputs = () => {
        if (!email.includes('@') || !email.includes('.')) {
            setError('Некорректный адрес электронной почты');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Пароли не совпадают');
            return false;
        }
        return true;
    };

  return (
    <div className='container'>
      <div className='lorby-page'>
        <div>
            <Lorby />
        </div>
        <div className='registration-modal'>
            <div className='back'>
                <img src={BackImg} alt=""/>
                <Link className='button-back' to="/">Назад</Link>
            </div>
          <h2 className='registration__title'>Создать аккаунт Lorby</h2>

          {error && <div className="error-message">{error}</div>}

          <input
              className='sign-in-input'
              type="email"
              placeholder="Введи адрес почты"
              value={email}
              required
              onChange={e => {
              setEmail(e.target.value);
              if (!isValidEmail(e.target.value)) {
                setEmailError('Неверный адрес электронной почты');
              } else {
                setEmailError('');
              }
              }}
          />
          {emailError && <div className="registration__error-email">{emailError}</div>}

          <input
              className='sign-in-input'
              type="text"
              placeholder="Придумай логин"
              value={login}
              onChange={e => setLogin(e.target.value)}
              pattern="[A-Za-z]*"
              required
          />

          <input
              className='sign-in-input'
              type={showPassword ? 'text' : 'password'}
              placeholder="Создай пароль"
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


          <ul className='registration-validation'>
            <li className={passwordValidations.length ? 'valid' : 'invalid'}>От 8 до 15 символов</li>
            <li className={passwordValidations.upperCase ? 'valid' : 'invalid'}>Строчные и прописные буквы</li>
            <li className={passwordValidations.digits ? 'valid' : 'invalid'}>Минимум 1 цифра</li>
            <li className={passwordValidations.specialChars ? 'valid' : 'invalid'}>Минимум 1 спецсимвол (!, ", #, $...)</li>
          </ul>

          <input
              className='sign-in-input'
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Повтори пароль"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              required
          />
          <button
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={showConfirmPassword ? 'show-password' : 'dont-show-pass'}
              type="button"
          >
          </button>
          {password && confirmPassword && !passwordValidations.match && <div className='registration__error'>Пароли не совпадают</div>}

          <Link
              to='./send-email-message'
              onClick={handleSubmit}
              className={isButtonDisabled ? "registration__button registration__button-disabled" : "registration__button registration__button-enabled"}
              aria-disabled={isButtonDisabled}
          >
              Далее
          </Link>
        </div>
      </div>
    </div>
  );
}

export {RegistrationPage};
