import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { LikeButton } from "../components/LikeButton";
import store from '../Store/store';
import { Provider } from 'react-redux';
import { getUser } from "../api/mock_api";
import { updateCurrentUser, selectCurrentUser} from '../pages/UserPage/currentUserSlice';
import renderer from 'react-test-renderer';
import { getByTestId } from "@testing-library/react";


const store1 = store;
test("render Search Bar display", async () => {

    const currentUser = {username: 'obama', password: 'obama123'};
    const userRoster = await getUser(currentUser.username);
    let user;
    userRoster.forEach(element => {
      user = element;
    });
    store1.dispatch(updateCurrentUser(user));

    const {getByText} = render(
            <LikeButton 
            username = "pig" 
            post =  {{
                id : '23',
                likes : 'pig'
            }}
            id="test-btn"
            />
    );
    const button = getByText(/Liked/);
    fireEvent.click(button);
    expect(button).toBeVisible();
});