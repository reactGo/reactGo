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
  extraReducers: (builder) => builder
    .addCase(logIn.pending, (state) => {
      state.message = '';
      state.isWaiting = true;
      state.authenticated = false;
    })
    .addCase(logIn.fulfilled, (state) => {
      state.message = '';
      state.isWaiting = false;
      state.authenticated = true;
    })
    .addCase(logIn.rejected, (state, action) => {
      state.message = action.payload as string;
      state.isWaiting = false;
      state.authenticated = false;
    })
    .addCase(signUp.pending, (state) => {
      state.message = '';
      state.isWaiting = true;
      state.authenticated = false;
    })
    .addCase(signUp.fulfilled, (state) => {
      state.message = '';
      state.isWaiting = false;
      state.authenticated = true;
      state.isLogin = true;
    })
    .addCase(signUp.rejected, (state, action) => {
      state.message = action.payload as string;
      state.isWaiting = false;
      state.authenticated = false;
    })
    .addCase(logOut.pending, (state) => {
      state.message = '';
      state.isWaiting = true;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.message = '';
      state.isWaiting = false;
      state.authenticated = false;
    })
    .addCase(logOut.rejected, (state, action) => {
      state.message = action.payload as string;
      state.isWaiting = false;
    })
    .addDefaultCase(() => {})
});

export default userSlice;
