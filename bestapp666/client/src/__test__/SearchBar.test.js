import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import store from '../Store/store';
import { Provider } from 'react-redux';


const store1 = store;
test("render Search Bar display", () => {
    const { getByText }  = render(
    <Provider store={store1}>
        <BrowserRouter>
            <SearchBar />
        </BrowserRouter>
    </Provider>
);
    const element = getByText(/Search/);
    expect(element).toBeVisible();
  });
  