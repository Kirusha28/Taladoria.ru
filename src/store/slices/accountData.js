import { createSlice } from '@reduxjs/toolkit'
import { initialStateUser } from '../../constants/initialUser'

const initialState = initialStateUser


export const createAccountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setUser(state, action) {
      return { ...action.payload, status: 'idle', loggedIn: true };
    },
    setLogout(state) {
      return { ...initialState, status: 'idle', loggedIn: false };
    },
    setLoadingFinished(state) {
      state.status = 'idle';
    }
  },
})

export const {
  setUser,  
  setLogout,
  setLoadingFinished,
} = createAccountDataSlice.actions
export default createAccountDataSlice.reducer

