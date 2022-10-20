import "../Styles.css";
import React from 'react';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux'
import {addLoginUser, logoutAction, selectCurrentUser} from '../pages/UserPage/currentUserSlice'

export function NavBar() {
    const stateCurrentUser = useSelector(selectCurrentUser);
    return (
    <div>
    <Navbar>
        <Nav defaultActiveKey="/" as="ul">
            <Nav.Item as="li">
            <NavLink to="/" className='headers2'>Home</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/register" className='headers2'>RegisterPage</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/login" className='headers2'>LoginPage</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to={'/user/'+stateCurrentUser.username} className='headers2'>MyPage</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/user/dog" className='headers2'>OtherUserPage</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/followerlist/trump" className='headers2'>Follower List</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/followinglist/trump" className='headers2'>Following List</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/upload" className='headers2'>UploadPostPage</NavLink>
            </Nav.Item>
            <Nav.Item as="li">
            <NavLink to="/feed" className='headers2'>FeedPage</NavLink>
            </Nav.Item>
        </Nav>
    </Navbar>
    </div>

    )
}