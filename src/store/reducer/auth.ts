import { createSlice } from "@reduxjs/toolkit";

interface State {
  token: string | null;
  initialized: boolean;
  isOnboardRequired: boolean;
}
const initialState: State = {
  token: null,
  initialized: false,
  isOnboardRequired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      // logger.info(action);
      state.token = action.payload;
    },
    setInitialized: (state, action) => {
      state.initialized = action.payload;
    },
    setOnboardingStatus: (state, action) => {
      state.isOnboardRequired = action.payload;
    },

    clearAuth: (state) => {
      state.token = null;
      state.initialized = false;
    },
  },
});

export const { setToken, clearAuth, setInitialized, setOnboardingStatus } = authSlice.actions;

export default authSlice.reducer;
