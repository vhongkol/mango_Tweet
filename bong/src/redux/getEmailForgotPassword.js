import { createSlice } from '@reduxjs/toolkit'

const emailSlice = createSlice({
  name: 'email',
  initialState: {
    email: ""
  },
  reducers: {
    setUserEmail: (state, action) => {
  
      state.email = action.payload;
    },   
  }
})

export const { setUserEmail } = emailSlice.actions

export default emailSlice.reducer