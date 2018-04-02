import * as types from '../types';

export const SignUpTest = ({ email, password, password_confirmation }) => {
  return
    axios({
      method: 'post',
      url: 'http://52.56.45.37/api/v1/auth',
      data: {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      }
    })
    .catch((error) => {
      console.log('ERROR ', error.response.data.errors.full_messages);
    });
};
