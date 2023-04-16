import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface AuthState {
  username: string;
  email: string;
  error: string | null;
}

interface loginUser {
  username: string;
  email: string;
}

const initialState: AuthState = {
  username: '',
  email: '',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoggedInState: (state, action: PayloadAction<loginUser>) => {
      const {email, username} = action.payload;
      state.username = username;
      state.email = email;
    },
    setLoggedOutState: state => {
      state.username = '';
      state.email = '';
      state.error = '';
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {setLoggedInState, setLoggedOutState, setError} =
  authSlice.actions;
export const getUserName = (state: RootState) => state.auth.username;
export const getUserEmail = (state: RootState) => state.auth.email;

export default authSlice.reducer;
