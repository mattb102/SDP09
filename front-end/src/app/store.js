import { configureStore } from '@reduxjs/toolkit'
import authenticatedReducer from '../features/authenticatedSlice'

export default configureStore({
  reducer: {
    authenticated: authenticatedReducer,
  },
})