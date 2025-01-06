import { createSlice } from '@reduxjs/toolkit'
import { initialStateUser } from '../../constants/initialUser'

const initialState = {
  activePage: 0,
}


export const createAccountDataSlice = createSlice({
  name: 'accountData',
  initialState,
  reducers: {
    setItems(state = initialState, action) {
      state.activePage = action.payload
    },
  },
})

export const {
  setItems,  
} = createAccountDataSlice.actions
export default createAccountDataSlice.reducer
