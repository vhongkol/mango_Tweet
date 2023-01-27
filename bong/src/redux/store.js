import { configureStore } from '@reduxjs/toolkit'
import getEmailForgotPasswordReducer from './getEmailForgotPassword';
import isLoggedInReducer from './isLoggedIn';
import counterReducer from './counter';


export default configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
    counter: counterReducer,
    getEmail: getEmailForgotPasswordReducer
  }
})