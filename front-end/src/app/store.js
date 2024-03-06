import { configureStore } from '@reduxjs/toolkit'
import authenticatedReducer from '../features/counter/authenticatedSlice'

export default configureStore({
  reducer: {
    authenticated: authenticatedReducer,
  },
})