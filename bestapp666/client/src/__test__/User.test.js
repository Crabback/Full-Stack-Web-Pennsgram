import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, render, screen , waitFor} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import User from "../pages/UserPage/User";
import { Provider } from 'react-redux';
import store from '../Store/store';
import { updateCurrentUser, selectCurrentUser} from '../pages/UserPage/currentUserSlice';
import { useSelector, useDispatch} from 'react-redux'
import { getUser } from "../api/mock_api";
import { act } from 'react-dom/test-utils';


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

test("Mock follow and unfollow", async () => {

  const currentUser = {username: 'obama', password: 'obama123'};
  const userRoster = await getUser(currentUser.username);
  let user;
  userRoster.forEach(element => {
    user = element;
  });
  store1.dispatch(updateCurrentUser(user));

  const { getByText }  = render(
      <Provider store={store1}>
        <BrowserRouter>
          <User />
        </BrowserRouter>
      </Provider>
    );
    const followinglist = getByText(/Followers/);  
    userEvent.click(followinglist);
    const following = getByText(/curry/);
    userEvent.click(following);
    const followBnt = screen.getByTestId("followingButton");
    userEvent.click(followBnt);
    await waitFor(()=>{
      expect(followBnt.hasAttribute("Follow"));
    })
    userEvent.click(followBnt);

  });