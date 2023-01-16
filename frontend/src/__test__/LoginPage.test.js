import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';
import renderer from 'react-test-renderer';


const store1 = store;
test("render login component", async () => {
  const { getByText } = render(
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
  const { getByText } = render(
    <Provider store={store1}>
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    </Provider>

  );
  const username = screen.getByPlaceholderText("Enter username (eg. dog)");
  const password = screen.getByPlaceholderText("Password");
  const submit = screen.getByText("Login");

  userEvent.type(username, "obama");
  userEvent.type(password, "obama123");
  userEvent.click(submit);

  const logSpy = jest.spyOn(console, 'log');
  await waitFor(() => {
    expect(logSpy).toHaveBeenCalledWith('Execute the code after clicking okay button of the alert window');
  })
});
