import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';

const store1 = store;
test("render home page component", async () => {
  const { getByText }  = render(
    <Provider store={store1}>
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    </Provider>
  );
  const element = getByText(/Start Your Journey/);
  const element1 = getByText(/Happy Pig!/);
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();

});