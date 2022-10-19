import "./Styles.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout"
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage/User";
import LoginPage from "./pages/LoginPage/LoginPage";
import UploadPostPage from "./pages/UploadPostPage";
import FeedPage  from "./pages/FeedPage/FeedPage";
import NoPage from "./pages/NoPage";
import UserPageNew from "./pages/UserPage/UserPageNew"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<UserPage follow="Follow"/>} />
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

