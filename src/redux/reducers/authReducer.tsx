import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';

interface AuthState {
  token?: string;
  username: string;
  error?: string | null;
}

const initialState: AuthState = {
  token: '',
  username: '',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoggedInState: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setLoggedOutState: state => {
      state.username = '';
    },
  },
});

export const {setToken, setLoggedInState, setError, setLoggedOutState} =
  authSlice.actions;
export const UserName = (state: RootState) => state.auth.username;

export default authSlice.reducer;
