import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mobileOpen: false,
  expandedTabPath: null,
}

const sidebarUISlice = createSlice({
  name: 'sidebarUI',
  initialState,
  reducers: {
    setMobileSidebarOpen(state, action) {
      state.mobileOpen = action.payload
    },
    setExpandedTabPath(state, action) {
      state.expandedTabPath = action.payload
    },
  },
})

export const { setMobileSidebarOpen, setExpandedTabPath } = sidebarUISlice.actions
export default sidebarUISlice.reducer
