import { observable } from 'mobx';
import { authService } from '../services';
import topicStore from './topic';
import { messageStore } from './index';

export default observable({
  isLogin: true,
  isWaiting: false,
  authenticated: false,
  message: '',
  toggleLoginMode() {
    this.isLogin = !this.isLogin;
  },
  manualLogin(data) {
    this.isWaiting = true;
    return authService().login(data)
      .then(() => {
        this.authenticated = true;
        topicStore.getTopics();
        // history.push('/');
        this.message = 'You have been successfully logged in';
        messageStore.successMessage('You have been successfully logged in');
      })
      .catch(() => {
        this.message = 'Oops! Invalid username or password';
      })
      .finally(() => {
        this.isWaiting = false;
      });
  },
  signUp(data) {
    this.isWaiting = true;
    return authService().signUp(data)
      .then(() => {
        // history.push('/');
        this.message = 'You have successfully registered an account!';
        this.authenticated = true;
        messageStore.successMessage('You have successfully registered an account!');
      })
      .catch(() => {
        this.message = 'Oops! Something went wrong when signing up';
      })
      .finally(() => {
        this.isWaiting = false;
      });
  },
  logOut() {
    this.isWaiting = true;
    return authService().logOut()
      .then(() => {
        this.authenticated = false;
      })
      .catch(() => {
        this.message = 'Oops! Something went wrong when signing up';
      })
      .finally(() => {
        this.isWaiting = false;
      });
  },
});
