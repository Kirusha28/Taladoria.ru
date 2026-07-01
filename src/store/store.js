import { configureStore } from '@reduxjs/toolkit'
import { mainApi } from './services/mainApi'

import accountData from './slices/accountData'
import sidebarUI from './slices/sidebarUI'

const combineReducers = {
  accountData: accountData,
  sidebarUI: sidebarUI,
  [mainApi.reducerPath]: mainApi.reducer,
}

export const store = configureStore({
  reducer: combineReducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApi.middleware),
})
