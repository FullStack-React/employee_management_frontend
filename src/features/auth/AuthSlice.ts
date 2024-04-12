import { createAppSlice } from '@/app/createAppSlice';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  id: string;
  token: string;
  username: string;
  email: string;
  role: string;
  onboardingStatus: 'unsubmitted' | 'pending' | 'approved' | 'rejected';
  loginStatus: boolean;
}

const initialState: AuthState = {
  id: '',
  token: '',
  username: '',
  email: '',
  role: '',
  onboardingStatus: 'unsubmitted',
  loginStatus: false,
};

export interface AuthPayload {
  id: string;
  token: string;
  username: string;
  email: string;
  role: string;
  status: 'unsubmitted' | 'pending' | 'approved' | 'rejected';
}

export const authSlice = createAppSlice({
  name: 'auth',
  initialState,
  reducers: create => ({
    auth: create.reducer((state, action: PayloadAction<AuthPayload>) => {
      state.id = action.payload.id;
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.onboardingStatus = action.payload.status;
      state.loginStatus = true;
    }),
    logout: create.reducer(state => {
      state.id = '';
      state.token = '';
      state.username = '';
      state.email = '';
      state.role = '';
      state.onboardingStatus = 'unsubmitted';
      state.loginStatus = false;
    }),
    queryOnboardingStatus: create.reducer((state, action) => {
      // @ts-ignore
      state.onboardingStatus = action.payload;
    }),
  }),
  selectors: {
    selectUser: user => user,
    selectRole: user => user.role,
    selectToken: user => user.token,
    selectOnboardingStatus: user => user.onboardingStatus,
    selectLoginStatus: user => user.loginStatus,
  },
});

export const { auth, logout, queryOnboardingStatus } = authSlice.actions;
export const {
  selectUser,
  selectRole,
  selectToken,
  selectOnboardingStatus,
  selectLoginStatus,
} = authSlice.selectors;
export default authSlice.reducer;
