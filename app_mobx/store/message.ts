import { observable } from 'mobx';

export interface MessageStore {
  message: string,
  type: string,
  dismissMessage(): void,
  successMessage(message: string): void,
}

export default (initialState: MessageStore): MessageStore => {
  const messageStore: MessageStore = observable({
    ...initialState,
    message: '',
    type: 'SUCCESS',
    dismissMessage() {
      messageStore.message = '';
      messageStore.type = 'SUCCESS';
    },
    successMessage(message: string) {
      messageStore.message = message;
      messageStore.type = 'SUCCESS';
    },
  });
  return messageStore;
};
