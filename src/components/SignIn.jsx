import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import photoSmile from '../img/Group.png';

const LoginForm = () => {
  const initialValues = {
    email: '',
    password: '',
  };

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {

    } catch (error) {
      console.error(error);
      setLoginError('Произошла ошибка при входе');
    }
    setSubmitting(false);
  };

  const validateEmail = (value) => {
    setIsValidEmail(Yup.string().email().isValidSync(value));
  };

  const validatePassword = (value) => {
    setIsValidPassword(Yup.string().min(8).isValidSync(value));
  };

  return (
    <main className="main">
      <div className="sign-in-modal">
        <div className="photo-smile">
          <img src={photoSmile} alt="" />
        </div>
        <div className='sign-in-input'>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email()
                .required(),
              password: Yup.string()
                .min(8)
                .required(),
            })}
            onSubmit={onSubmit}
          >
            {({ isSubmitting, values, setFieldValue }) => {
              const isFormValid = isValidEmail && isValidPassword;

              return (
                <Form>
                  <div>
                    <Field
                      className='sign-in-field'
                      type="email"
                      name="email"
                      placeholder="Электронная почта"
                      onChange={(e) => {
                        setFieldValue('email', e.target.value);
                        validateEmail(e.target.value);
                      }}
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <Field
                      className='sign-in-field sign-in-password'
                      type={values.showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Пароль"
                      onChange={(e) => {
                        setFieldValue('password', e.target.value);
                        validatePassword(e.target.value);
                      }}
                    />
                    <button
                      className={values.showPassword ? 'show-password' : 'dont-show-pass'}
                      type="button"
                      onClick={() => setFieldValue('showPassword', !values.showPassword)}
                    >
                    </button>
                    <ErrorMessage name="password" component="div" />
                    <p className='forgot-password-text'>
                      <button className='forgot-password'>Забыли пароль?</button>
                    </p>
                  <div>
                    {loginError && <div className="error">{loginError}</div>}
                    <button
                      type="submit"
                      disabled={isSubmitting || !isValidEmail || !isValidPassword || !values.email || !values.password}
                      className={isFormValid && isValidEmail && isValidPassword && values.email && values.password ? 'active' : 'not-active'}
                    >
                      Войти
                    </button>
                  </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
          <p >
            <button className='start-use'>Начать пользоваться?</button>
          </p>
        </div>
        </div>
      </div>
    </main>
  );
};

export default LoginForm;
