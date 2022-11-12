/** @jest-environment jsdom */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NoPage from "../pages/NoPage";
import renderer from 'react-test-renderer';
import store from '../Store/store';
import { Provider } from 'react-redux';

const store1 = store;

test("render friends component", async () => {
  const test = renderer.create(
    <Provider store={store1}>
      <NoPage />
      </Provider>

  );
  const tree = test.toJSON();
  expect(tree).toMatchSnapshot();
});
