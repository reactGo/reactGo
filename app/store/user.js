import { observable } from 'mobx';
import { createBrowserHistory } from 'history';
import { authService } from '../services';
import { store } from '../Context';

const history = createBrowserHistory();
export default (initalState) => {
  const userStore = observable({
    isLogin: true,
    isWaiting: false,
    authenticated: false,
    message: '',
    ...initalState,
    toggleLoginMode() {
      userStore.isLogin = !userStore.isLogin;
    },
    manualLogin(data) {
      userStore.isWaiting = true;
      return authService().login(data)
        .then(() => {
          history.push('/');
          userStore.authenticated = true;
          store.topicStore.getTopics();
          userStore.message = '';
          store.messageStore.successMessage('You have been successfully logged in');
        })
        .catch(() => {
          userStore.message = 'Oops! Invalid username or password';
        })
        .finally(() => {
          userStore.isWaiting = false;
        });
    },
    signUp(data) {
      userStore.isWaiting = true;
      return authService().signUp(data)
        .then(() => {
          // history.push('/');
          userStore.message = 'You have successfully registered an account!';
          userStore.authenticated = true;
          store.messageStore.successMessage('You have successfully registered an account!');
        })
        .catch(() => {
          userStore.message = 'Oops! Something went wrong when signing up';
        })
        .finally(() => {
          userStore.isWaiting = false;
        });
    },
    logOut() {
      userStore.isWaiting = true;
      return authService().logOut()
        .then(() => {
          userStore.authenticated = false;
        })
        .catch(() => {
          userStore.message = 'Oops! Something went wrong when signing up';
        })
        .finally(() => {
          userStore.isWaiting = false;
        });
    },
  });
  return userStore;
};
