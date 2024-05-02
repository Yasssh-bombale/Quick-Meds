import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userObject {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePicture: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface initialStateObject {
  user: any;
  isLoading: boolean;
}

const initialState: initialStateObject = {
  user: null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "userState",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.user = null;
      state.isLoading = true;
    },
    signInSuccess: (state, action: PayloadAction<userObject>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    signInFailure: (state) => {
      state.user = null;
      state.isLoading = false;
    },
    signOutStart: (state) => {
      state.user = null;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, signOutStart } =
  userSlice.actions;
export default userSlice.reducer;
