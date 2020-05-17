import { observable } from 'mobx';

export default (initalState) => {
  const messageStore = observable({
    message: '',
    type: 'SUCCESS',
    ...initalState,
    dismissMessage() {
      messageStore.message = '';
      messageStore.type = 'SUCCESS';
    },
    successMessage(message) {
      messageStore.message = message;
      messageStore.type = 'SUCCESS';
    },
  });
  return messageStore;
};
