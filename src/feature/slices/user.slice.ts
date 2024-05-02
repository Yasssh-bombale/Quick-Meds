import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userObject {
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
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
