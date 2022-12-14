import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import FeedPage from "../pages/FeedPage";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';
import renderer from 'react-test-renderer';
import { updateCurrentUser, selectCurrentUser} from '../pages/UserPage/currentUserSlice';
import { getUser } from "../api/mock_api";


const store1 = store;

test('Page matches snapshot', async () => {
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
    const post = getByText(/pig/);
    expect(post).toBeVisible();
});

test('handels view likes', async () => {
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
  const likedPeople = getByText(/2 likes/);
  userEvent.click(likedPeople);
  const liker = getByText(/ayesha/);
  expect(liker).toBeVisible();
});

test('handels view comment', async () => {
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
  const comments = getByText(/1 comments/);
  userEvent.click(comments);
  const commenter = getByText(/Good luck/);
  expect(commenter).toBeVisible();
});

test('handels comment', async () => {
  const { getByText } = render(
      <Provider store={store1}>
        <BrowserRouter>
          <FeedPage />
        </BrowserRouter>
      </Provider>
  );
  const comments = screen.getByPlaceholderText(/Leave a/);
  userEvent.type(comments, "hi");
  const submit = getByText(/Comment/);
  userEvent.click(submit, "hi");
  const testSubmit = getByText(/Comment/);
  expect(testSubmit).toBeVisible();
});

test('handels @', async () => {
  const { getByText } = render(
      <Provider store={store1}>
        <BrowserRouter>
          <FeedPage />
        </BrowserRouter>
      </Provider>
  );
  const comments = screen.getByPlaceholderText(/Mention/);
  userEvent.type(comments, "@Elon");
  const submit = getByText(/Comment/);
  userEvent.click(submit);
  const testSubmit = getByText(/Comment/);
  expect(testSubmit).toBeVisible();
});