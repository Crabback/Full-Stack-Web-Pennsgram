import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactRoundedImage from "react-rounded-image";
import { useSelector, useDispatch } from 'react-redux'
import {addLoginUser, logoutAction, selectCurrentUser} from './UserPage/currentUserSlice'
import { SearchBar } from "../components/SearchBar";

//component unit
function LoginLink() {
  const dispatch = useDispatch();
  const stateCurrentUser = useSelector(selectCurrentUser);
  const username = stateCurrentUser.username;

  const [newInput, setInput] = useState({ username: '', password: '' });

  const handleLinkOnClick= (e) => {
    dispatch(logoutAction());
    console.log("currentuser " + stateCurrentUser.username + " has logged out: ");
  };

  if(stateCurrentUser.username == "NOT_A_USER"){
    return (<NavLink to="/login" className='headers'>{"Login"}</NavLink>);
  }else{
    return (<NavLink onClick={handleLinkOnClick} to="/login" className='headers'>Logout</NavLink>);
  }
}


function Layout(){

  //get the current user's attributes
  const stateCurrentUser = useSelector(selectCurrentUser);
  const username = stateCurrentUser.username;
  const avatar = stateCurrentUser.avatar;

  return (
    <>
    {/* the pages Nav for development use */}
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
            <NavLink to="/user" className='headers2'>UserPage</NavLink>
          </Nav.Item>
          <Nav.Item as="li">
            <NavLink to="/followerlist" className='headers2'>UserList (Followers/Following)</NavLink>
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

    {/* the logo "brand" bar */}
    <div className="background">
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Col sm={6}>
          </Col>
          <Col>
                <Nav className="justify-content-end" activeKey="/">
                  <Nav.Item>
                    <NavLink to='/user'>
                      <ReactRoundedImage
                        image={avatar}
                        roundedColor="#ffffff"
                        imageWidth="35"
                        imageHeight="35"
                        roundedSize="2"
                        borderRadius="20"
                      />
                    </NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink to='/user' className='headers'>{username}</NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink to="/register" className='headers'>Sign up</NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    {/* handle login to logout */}
                    <LoginLink />
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink to="" className='headers'>About</NavLink>
                  </Nav.Item>
                  <Nav.Item>
                    <NavLink eventKey="disabled" className='headers' disabled>
                      Contact Us
                    </NavLink>
                  </Nav.Item>
                </Nav>
          </Col>
        </Container>
      </Navbar>

      <Row>
        <Col sm={8}>
          <NavLink to="">
            <Navbar.Brand style={{paddingLeft: "rem"}}>
              <img src={require("../images/pennsgram_logo.png")} alt="logo" width="527" height="149"></img>
            </Navbar.Brand>
          </NavLink>
        </Col>
        <Col >
        <SearchBar />
        </Col>
      </Row>
      <Row style={{paddingTop: "5rem", paddingLeft: "rem"}}></Row>
    </div>

      <Outlet />
    </>
  )
};

export default Layout;