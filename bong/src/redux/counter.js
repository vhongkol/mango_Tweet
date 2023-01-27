import { createSlice } from '@reduxjs/toolkit'

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: false
  },
  reducers: {
    incremented: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.count = state.count ? false : true;
    },
    decremented: state => {
      state.count -= 1
    }
  }
})

export const { incremented, decremented } = counterSlice.actions

export default counterSlice.reducer