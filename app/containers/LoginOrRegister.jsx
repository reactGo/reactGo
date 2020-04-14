import React, { useState, useCallback } from 'react';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';

import { manualLogin, signUp, toggleLoginMode } from '../actions/users';
import styles from '../css/components/login';
import hourGlassSvg from '../images/hourglass.svg';

const cx = classNames.bind(styles);

const LoginOrRegister = () => {
  const { isWaiting, message, isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatchManualLogin = (data) => dispatch(manualLogin(data));
  const dispatchSignUp = (data) => dispatch(signUp(data));
  const dispatchToggleLoginMode = () => dispatch(toggleLoginMode());

  const onChangeEmail = useCallback((event) => {
    setEmail(event.currentTarget.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.currentTarget.value);
  }, []);

  const handleOnSubmit = useCallback((event) => {
    event.preventDefault();

    if (isLogin) {
      dispatchManualLogin({ email, password });
    } else {
      dispatchSignUp({ email, password });
    }
  }, [isLogin, email, password]);

  const renderHeader = () => {
    if (isLogin) {
      return (
        <div className={cx('header')}>
          <h1 className={cx('heading')}>Login with Email</h1>
          <div className={cx('alternative')}>
            Not what you want?
            <button
              type="button"
              className={cx('alternative-link')}
              onClick={dispatchToggleLoginMode}
            >
              Register an Account
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className={cx('header')}>
        <h1 className={cx('heading')}>Register with Email</h1>
        <div className={cx('alternative')}>
          Already have an account?
          <button
            type="button"
            className={cx('alternative-link')}
            onClick={dispatchToggleLoginMode}
          >
            Login
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={cx('login', { waiting: isWaiting })}>
      <div className={cx('container')}>
        {renderHeader()}
        <img className={cx('loading')} alt="loading" src={hourGlassSvg} />
        <div className={cx('email-container')}>
          <form onSubmit={handleOnSubmit}>
            <input
              className={cx('input')}
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="email"
            />
            <input
              className={cx('input')}
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="password"
            />
            <div className={cx('hint')}>
              <div>Hint</div>
              <div>email: example@ninja.com password: ninja</div>
            </div>
            <p
              className={cx('message', { 'message-show': message && message.length > 0 })}>
              {message}
            </p>
            <input
              className={cx('button')}
              type="submit"
              value={isLogin ? 'Login' : 'Register'} />
          </form>
        </div>
        <div className={cx('google-container')}>
          <h1 className={cx('heading')}>Google Login Demo</h1>
          <a
            className={cx('button')}
            href="/auth/google">
            Login with Google
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginOrRegister;
