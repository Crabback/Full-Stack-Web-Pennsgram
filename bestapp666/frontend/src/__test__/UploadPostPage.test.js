import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UploadPostPage from "../pages/UploadPostPage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';
import renderer from 'react-test-renderer';

const store1 = store;
test('Page matches snapshot', async () => {
    const component = renderer.create(
        <Provider store={store1}>
        <BrowserRouter>
            <UploadPostPage />
        </BrowserRouter>
        </Provider>

    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("textbox displayed", async () => {

    const { getByRole } = render(
        <Provider store={store1}>
      <BrowserRouter>
        <UploadPostPage />
      </BrowserRouter>
      </Provider>

    );
    const text = screen.getByPlaceholderText("Description about the picture/video.");
    const image = screen.getByPlaceholderText("Enter online image url");

    userEvent.type(text, "nothing");
    userEvent.type(image, "image");
    await userEvent.click(
        screen.getByRole("button", {
            name: "Upload"
        })
    );
    expect(
        await screen.findByText(/Description/)
    ).toBeVisible();
  });