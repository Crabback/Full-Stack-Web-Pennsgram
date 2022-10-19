import { configureStore } from '@reduxjs/toolkit'
// import usersReducer from '../features/users/usersSlice'
// import postsReducer from '../features/posts/postsSlice'
// import commentsReducer from '../features/comments/commentsSlice'
import currentUserReducer from '../pages/LoginPage/currentUserSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer,
    
  }
})