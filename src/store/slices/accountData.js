import { createSlice } from '@reduxjs/toolkit'
import { initialStateUser } from '../../constants/initialUser'

const initialState = initialStateUser


export const createAccountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setItems(state = initialState, action) {
      state.userAcc.items = action.payload
    },
  },
})

export const {
  setItems,  
} = createAccountDataSlice.actions
export default createAccountDataSlice.reducer
