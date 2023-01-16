import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Layout from "../pages/Layout";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';


const store1 = store;
test("render layout component", async () => {
  const { getByText }  = render(
     <Provider store={store1}>
         <BrowserRouter>
            <Layout />
        </BrowserRouter>
      </Provider>
  );
  const element = getByText(/FeedPage/);
  const element1 = getByText(/UploadPostPage/);
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();

});