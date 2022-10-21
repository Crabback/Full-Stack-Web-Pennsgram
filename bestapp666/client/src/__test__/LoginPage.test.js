import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';


const store1 = store;
test("render login component", () => {
  const { getByText }  = render(
     <Provider store={store1}>
        <LoginPage />
      </Provider>
  );
  const element = getByText(/Username/);
  const element1 = getByText(/Password/);
  const element2 = getByText(/Login/);
  expect(element).toBeVisible();
  expect(element1).toBeVisible();
  expect(element2).toBeVisible();

});
