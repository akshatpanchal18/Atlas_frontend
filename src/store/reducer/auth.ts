import { createSlice } from "@reduxjs/toolkit";

interface State {
  token: null;
}
const initialState: State = {
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // console.log(action);
      state.token = action.payload;
    },

    clearAuth: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;

export default authSlice.reducer;
