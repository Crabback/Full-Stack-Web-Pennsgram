import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import FeedPage from "../pages/FeedPage/FeedPage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';
import renderer from 'react-test-renderer';
import { updateCurrentUser, selectCurrentUser} from '../pages/UserPage/currentUserSlice';
import { getUser } from "../api/mock_api";


const store1 = store;

test('Page matches snapshot', () => {
    const component = renderer.create(
        <Provider store={store1}>
        <BrowserRouter>
            <FeedPage />
        </BrowserRouter>
        </Provider>

    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

test('render feed page as logged in user list ', async () => {
    const currentUser = {username: 'obama', password: 'obama123'};
    const userRoster = await getUser(currentUser.username);
    let user;
    userRoster.forEach(element => {
      user = element;
    });
    store1.dispatch(updateCurrentUser(user));
    const { getByText } = render(
        <Provider store={store1}>
          <BrowserRouter>
            <FeedPage />
          </BrowserRouter>
        </Provider>
    );
    const post = getByText(/cat/);
    expect(post).toBeVisible();

});

