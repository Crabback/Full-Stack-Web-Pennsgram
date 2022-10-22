import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import User from "../pages/UserPage/User";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';

const myMock = jest.fn();
console.log(myMock());

const store1 = store;
test("render user page component", () => {
  const { getByText }  = render(
     <Provider store={store1}>
         <BrowserRouter>
            <User />
        </BrowserRouter>
      </Provider>
  );

  const element = getByText(/Following/);
  const element1 = getByText(/Followers/);
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();

});


/** 
test("Mock follow", async () => {

    const { getByRole } = render(
        <Provider store={store1}>
      <BrowserRouter>
        <User />
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

  */ 