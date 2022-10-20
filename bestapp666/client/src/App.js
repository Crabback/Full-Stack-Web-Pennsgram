import "./Styles.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout"
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import User from "./pages/UserPage/User";
import UserList from "./pages/UserList";
import LoginPage from "./pages/LoginPage/LoginPage";
import UploadPostPage from "./pages/UploadPostPage";
import FeedPage from "./pages/FeedPage/FeedPage";
import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="user">
            <Route path=":username" element={<User />}/>
            <Route path="*" element={<NoPage />}/>
          </Route>
          <Route path="followerlist" >
            <Route path=":username" element={<UserList list="follower"/>}/>
            <Route path="*" element={<NoPage />}/>
          </Route>
          <Route path="followinglist" >
            <Route path=":username" element={<UserList />}/>
            <Route path="*" element={<NoPage />}/>
          </Route>
          <Route path="register" element={<RegisterPage />} />
          <Route path="upload" element={<UploadPostPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="feed" element={<FeedPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

