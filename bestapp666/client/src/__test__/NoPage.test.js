/** @jest-environment jsdom */

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import NoPage from "../pages/NoPage";

test("render friends component", () => {
  const test = render(
      <NoPage />
  );
  const element = test.getByText(/404/);
  expect(element).toBeVisible();
});
