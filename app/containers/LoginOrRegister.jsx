import React, { useState, useCallback } from 'react';
import { useObserver } from 'mobx-react';

import hourGlassSvg from '../images/hourglass.svg';
import {
  Alternative,
  AlternativeLink, Button,
  EmailContainer,
  GoogleContainer,
  Header,
  Heading, Hint, Input, Loading,
  LoginWrapper, Message,
} from '../css/components/login';
import useStore from '../useStore';

const LoginOrRegister = () => {
  const { userStore } = useStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onChangeEmail = useCallback((event) => {
    setEmail(event.currentTarget.value);
  }, []);

  const onChangePassword = useCallback((event) => {
    setPassword(event.currentTarget.value);
  }, []);

  const handleOnSubmit = useCallback((event) => {
    event.preventDefault();

    if (userStore.isLogin) {
      userStore.manualLogin({ email, password });
    } else {
      userStore.signUp({ email, password });
    }
  }, [userStore.isLogin, email, password]);

  const renderHeader = () => {
    if (userStore.isLogin) {
      return useObserver(() => (
        <Header>
          <Heading>Login with Email</Heading>
          <Alternative>
            Not what you want?
            <AlternativeLink
              type="button"
              onClick={userStore.toggleLoginMode}
            >
              Register an Account
            </AlternativeLink>
          </Alternative>
        </Header>
      ));
    }

    return useObserver(() => (
      <Header>
        <Heading>Register with Email</Heading>
        <Alternative>
          Already have an account?
          <AlternativeLink
            type="button"
            onClick={userStore.toggleLoginMode}
          >
            Login
          </AlternativeLink>
        </Alternative>
      </Header>
    ));
  };

  return useObserver(() => (
    <LoginWrapper waiting={userStore.isWaiting}>
      <div>
        {renderHeader()}
        <Loading alt="loading" src={hourGlassSvg} />
        <EmailContainer>
          <form onSubmit={handleOnSubmit}>
            <Input
              type="email"
              value={email}
              onChange={onChangeEmail}
              placeholder="email"
            />
            <Input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="password"
            />
            <Hint>
              <div>Hint</div>
              <div>email: example@ninja.com password: ninja</div>
            </Hint>
            <Message show={userStore.message && userStore.message.length > 0}>
              {userStore.message}
            </Message>
            <Button
              as="input"
              type="submit"
              value={userStore.isLogin ? 'Login' : 'Register'} />
          </form>
        </EmailContainer>
        <GoogleContainer>
          <Heading>Google Login Demo</Heading>
          <Button
            as="a"
            href="/auth/google">
            Login with Google
          </Button>
        </GoogleContainer>
      </div>
    </LoginWrapper>
  ));
};

export default LoginOrRegister;
