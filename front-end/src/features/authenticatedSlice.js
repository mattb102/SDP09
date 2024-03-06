import { createSlice } from '@reduxjs/toolkit'

export const authenticatedSlice = createSlice({
  name: 'authenticated',
  initialState: {
    value: false,
  },
  reducers: {
    login: (state) => {
        state.value = true
    },
    logout: (state) => {
        state.value = false
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authenticatedSlice.actions

export default authenticatedSlice.reducer