import { createSlice } from '@reduxjs/toolkit'

export const otherUserSlice = createSlice({
    name: 'otherUser',
    initialState: {
      id: -1,
      username: 'NOT_A_USER',
      password: '',
      followings: [],
      avatar:"https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067",
      posts: []
    },
    reducers: {
      searchUser: (state, action) => {
        return action.payload
      }
    }
  })
  
  export const { searchUser } = otherUserSlice.actions
  export const selectOtherUser = (state) => state.otherUser
  
  export default otherUserSlice.reducer