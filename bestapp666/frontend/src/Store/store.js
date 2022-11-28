/* istanbul ignore file */

import { configureStore } from '@reduxjs/toolkit'
import currentUserReducer from '../pages/UserPage/currentUserSlice'

export default configureStore({
  reducer: {
    currentUser: currentUserReducer
  }
})