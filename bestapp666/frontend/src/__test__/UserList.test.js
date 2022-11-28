import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import UserList from "../pages/UserList";
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import store from '../Store/store';
import renderer from 'react-test-renderer';
import { getUser } from "../api/mock_api";
import { updateCurrentUser, selectCurrentUser} from '../pages/UserPage/currentUserSlice';



const store1 = store;

test('render following list ', async () => {
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
            <UserList />
          </BrowserRouter>
        </Provider>
    );
    const following = getByText(/zanemao/);
    expect(following).toBeVisible();

});

test('Page matches snapshot', async  () => {

    const component = renderer.create(
        <Provider store={store1}>
        <BrowserRouter>
            <UserList />
        </BrowserRouter>
        </Provider>

    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });


test('render follower list ', async () => {
    const { getByText }  = render(
        <Provider store={store1}>
          <BrowserRouter>
            <UserList list="follower"/>
          </BrowserRouter>
        </Provider>
    );
    const follower = getByText(/trump/);
    expect(follower).toBeVisible();

});



