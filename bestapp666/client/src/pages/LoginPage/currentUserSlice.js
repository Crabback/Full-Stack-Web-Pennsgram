import { createSlice } from '@reduxjs/toolkit'

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    id: -1,
    username: '',
    password: '',
    followings: [],
    posts: []
  },
  reducers: {
    addLoginUser: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state =  action.user
    },
    logoutAction: state => {
      state = {
        id: -1,
        username: '',
        password: '',
        followings: [],
        posts: []
      }
    },
  }
})

export const { addLoginUser, logoutAction } = currentUserSlice.actions

export default currentUserSlice.reducer