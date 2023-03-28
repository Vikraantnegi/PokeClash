import {createSlice} from '@reduxjs/toolkit';

interface UserObject {
  name?: string;
  username: string;
  email?: string;
  password?: string;
}

const initialState: UserObject = {
  name: '',
  username: '',
  email: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
