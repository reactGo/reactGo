import { observable } from 'mobx';

export default observable({
  message: '',
  type: 'SUCCESS',
  dismissMessage() {
    this.message = '';
    this.type = 'SUCCESS';
  },
  successMessage(message) {
    this.message = message;
    this.type = 'SUCCESS';
  },
});
