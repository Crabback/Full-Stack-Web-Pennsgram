/** @jest-environment jsdom */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";

test("render friends component", () => {
  const { getByPlaceholderText, getByTestId } = render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  );
  const element = getByTestId("submitForm");
  expect(element).toBeVisible();
});
