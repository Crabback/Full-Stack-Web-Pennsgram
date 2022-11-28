import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import RegisterPage from "../pages/RegisterPage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';
import renderer from 'react-test-renderer';
import jestConfig from '../../jest.config';
import {handleRegister} from '../pages/RegisterPage'



const store1 = store;
test("render register page component", async () => {
  const { getByText }  = render(
     <Provider store={store1}>
         <BrowserRouter>
            <RegisterPage />
        </BrowserRouter>
      </Provider>
  );
  const element = getByText(/Date of Birth/);
  const element1 = getByText(/Profile Picture/);
  expect(element).toBeInTheDocument();
  expect(element1).toBeInTheDocument();

});

test('Page matches snapshot', async () => {
    const component = renderer.create(
        <BrowserRouter>
        <RegisterPage />
        </BrowserRouter>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("textbox displayed", async () => {
    const { getByRole } = render(
      <BrowserRouter>
        <RegisterPage />
      </BrowserRouter>
    );
    const firstname = screen.getByPlaceholderText("First Name");
    const lastname = screen.getByPlaceholderText("Last Name");
    userEvent.type(firstname, "hihi");
    userEvent.type(lastname, "abc");
    userEvent.click(
        screen.getByRole("button", {
            name: "Submit"
        })
    );
    expect(
        await screen.findByText(/First Name/)
    ).toBeVisible();
  });