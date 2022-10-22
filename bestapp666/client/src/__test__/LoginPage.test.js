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
import renderer from 'react-test-renderer';


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

test("Mock login", async () => {

  const { getByRole } = render(
      <Provider store={store1}>
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
    </Provider>

  );
  const username = screen.getByPlaceholderText("Enter username (eg. dog)");
  const password = screen.getByPlaceholderText("Password");

  userEvent.type(username, "obama");
  userEvent.type(password, "obama123");
  await userEvent.click(
      screen.getByRole("button", {
          name: "Login"
      })
  );
  expect(
      await screen.findByText(/Login/)
  ).toBeVisible();
});
