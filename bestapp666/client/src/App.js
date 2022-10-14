import "./Styles.css";
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./pages/Layout"
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/User";
import LoginPage from "./pages/LoginPage";
import BrowsePage from "./pages/BrowsePage";

import NoPage from "./pages/NoPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="user" element={<UserPage follow="Follow"/>} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="browse" element={<BrowsePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

