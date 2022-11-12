import '@testing-library/jest-dom/extend-expect';

import React from "react";
import { getByDisplayValue, getByPlaceholderText, render, screen } from "@testing-library/react";
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
import { CardCustomed } from '../components/CardCustomed';

const store1 = store;

test('render post card as logged in user ', async () => {
    const currentUser = {username: 'obama', password: 'obama123'};
    const userRoster = await getUser(currentUser.username);
    let user;
    userRoster.forEach(element => {
      user = element;
    });
    store1.dispatch(updateCurrentUser(user));
    const component = renderer.create(
        <Provider store={store1}>
          <BrowserRouter>
            <CardCustomed />
          </BrowserRouter>
        </Provider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();

});

test("handels comment action", async () => {
    const {getByText} = render(
        <BrowserRouter>

        <CardCustomed 
        username = "pig" 
        post =  {{
            id : '23',
            likes : 'pig',
            author : "dog",
            description: "The film I am in with my 100 friends",
            date: "10/16/2022",
            image: "http://images.randomhouse.com/cover/9780736431828?&alt=sir.jpg",
            likes: [],
            comments :
              [{
                author: "zanemao",
                comment: "zane leaves a comment test.",
                mention: ""
              },
              {
                author: "zanemao",
                comment: "look at this post, trump",
                mention: "@[trump](trump)"
              }]
        }}
        />
        </BrowserRouter>

);
const submit = getByDisplayValue(/Comment/);
fireEvent.click(submit);
expect(submit).toBeVisible();
});

test("handels comment action", async () => {
    const {getByText} = render(
        <BrowserRouter>

        <CardCustomed 
        username = "pig" 
        post =  {{
            id : '23',
            likes : 'pig',
            author : "dog",
            description: "The film I am in with my 100 friends",
            date: "10/16/2022",
            image: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/Stw4Y28Bippgedql/videoblocks-close-up-of-female-hands-gently-petting-happy-cute-labrador-retriever-outdoors-loyal-dog-enjoying-caressing-of-her-owner-gazing-at-best-friend-with-loving-and-devoted-look-during-a-walk-in__a1132b0f42597e2627f47987b37f6406__P360.mp4",
            likes: [],
            comments :
              [{
                author: "zanemao",
                comment: "zane leaves a comment test.",
                mention: ""
              },
              {
                author: "zanemao",
                comment: "look at this post, trump",
                mention: "@[trump](trump)"
              }]
        }}
        />
        </BrowserRouter>

);
const submit = getByText(/Comment/);
const textarea = getByPlaceholderText(/Leave a comment./);
userEvent.type(textarea, "test");
fireEvent.click(submit);
expect(submit).toBeVisible();
});