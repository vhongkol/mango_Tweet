import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'isLoggedIn',
  initialState: {
    userLogin: false, 
    userToken: ""
  },
  reducers: {
    loginUser: (state, action) => {
      state.userLogin = true;
      state.userToken = action.payload;      
    },
    logoutUser: state => {
      state.userLogin = false;
      state.userToken = "";
    },    
  }
})

// Action creators are generated for each case reducer function
export const { loginUser, logoutUser } = loginSlice.actions

export default loginSlice.reducer