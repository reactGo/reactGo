import { createSlice } from '@reduxjs/toolkit';
import { logIn, signUp, logOut } from '../actions/users';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: true,
    isWaiting: false,
    authenticated: false,
    message: '',
  },
  reducers: {
    toggleLoginMode(state) {
      state.isLogin = !state.isLogin;
    }
  },
  extraReducers: {
    [logIn.pending]: (state) => {
      state.message = '';
      state.isWaiting = true;
      state.authenticated = false;
    },
    [logIn.fulfilled]: (state) => {
      state.message = '';
      state.isWaiting = false;
      state.authenticated = true;
    },
    [logIn.rejected]: (state, action) => {
      state.message = action.payload;
      state.isWaiting = false;
      state.authenticated = false;
    },
    [signUp.pending]: (state) => {
      state.message = '';
      state.isWaiting = true;
      state.authenticated = false;
    },
    [signUp.fulfilled]: (state) => {
      state.message = '';
      state.isWaiting = false;
      state.authenticated = true;
      state.isLogin = true;
    },
    [signUp.rejected]: (state, action) => {
      state.message = action.payload;
      state.isWaiting = false;
      state.authenticated = false;
    },
    [logOut.pending]: (state) => {
      state.message = '';
      state.isWaiting = true;
      state.authenticated = false;
    },
    [logOut.fulfilled]: (state) => {
      state.message = '';
      state.isWaiting = false;
      state.authenticated = true;
    },
    [logOut.rejected]: (state, action) => {
      state.message = action.payload;
      state.isWaiting = false;
      state.authenticated = false;
    },
  }
});

export default userSlice;
