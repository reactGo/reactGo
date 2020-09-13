import { createSlice } from '@reduxjs/toolkit';
import { logIn, signUp } from '../actions/users';
/*
 * Message store for global messages, i.e. Network messages / Redirect messages
 * that need to be communicated on the page itself. Ideally
 * messages/notifications should appear within the component to give the user
 * more context. - My 2 cents.
 */
const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
    type: 'SUCCESS',
  },
  reducers: {
    dismissMessage(state) {
      state.message = '';
      state.type = 'SUCCESS';
    },
  },
  extraReducers: {
    [logIn.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.type = 'SUCCESS';
    },
    [signUp.fulfilled]: (state, action) => {
      state.message = action.payload;
      state.type = 'SUCCESS';
    },
  },
});

export default messageSlice.reducer;
