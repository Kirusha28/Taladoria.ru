import { createSlice } from '@reduxjs/toolkit'
import { initialStateUser } from '../../constants/initialUser'

const initialState = initialStateUser


export const createAccountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
})

export const {
  setUser,  

} = createAccountDataSlice.actions
export default createAccountDataSlice.reducer

