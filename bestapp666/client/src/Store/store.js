import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../pages/UserPage/currentUserSlice'
import otherUserReducer from '../pages/UserPage/otherUserSlice'


export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    otherUser: otherUserReducer
  }
})