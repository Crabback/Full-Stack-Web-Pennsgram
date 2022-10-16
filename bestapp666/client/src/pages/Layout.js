import React, { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "../images/user_pic1.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {addLoginUser, logoutAction, selectCurrentUser} from './LoginPage/currentUserSlice'


//component unit
function LoginLink() {
  const stateCurrentUser = useSelector(selectCurrentUser);
  const username = stateCurrentUser.username;
  const handleLinkOnClick= (e) => {
    console.log(stateCurrentUser.username);
  };

  if(stateCurrentUser.username == "NOT_A_USER"){
    return (<Nav.Link href="/login">{"Login"}</Nav.Link>);
  }else{
    return (<Nav.Link onClick={handleLinkOnClick} href="/login">Logout</Nav.Link>);
  }
  
}

function Layout(){

  //get the current user's attributes
  const stateCurrentUser = useSelector(selectCurrentUser);
  const userid = stateCurrentUser.id;
  const username = stateCurrentUser.username;
  const avatar = stateCurrentUser.avatar;

  //the below section handle the re-routing of clicking the username button
  const [clickProfile, setClickProfile] = useState(false);

  const routeChange = () =>{
    setClickProfile(true);
  }

  return (
    <>
    
    {/* the pages Nav for development use */}
    <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Nav defaultActiveKey="/" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/user">UserPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/userNew">OtherUser</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/register">SignupPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/upload">UploadPostPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/login">LoginPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/feed">FeedPage</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    </div>

    {/* the logo "brand" bar */}
    <div className="top_half_page">
    <Navbar>
        <Container>
          <Col sm={6}>
          <Navbar.Brand href="#home">
          <img src={require("../images/pennsgram_logo.png")} alt="logo" width="351" height="99"></img>
          </Navbar.Brand>
          </Col>
          <header>
          <Col>
              <Row xs='auto'>
              </Row>
              <Row>
                <Nav className="justify-content-end" activeKey="/">
                <Nav.Item>
                  <ReactRoundedImage
                    image={avatar}
                    roundedColor="#321124"
                    imageWidth="35"
                    imageHeight="35"
                    roundedSize="2"
                    borderRadius="20"
                  />
                </Nav.Item>
                <Nav.Item><Nav.Link href="/user">Username</Nav.Link></Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="/register">Sign up</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    {/* handle login to logout */}
                    <LoginLink />
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="link-2">About</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                      Contact Us
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Row>

              <Row className="align-items-center">
                <Col sm={4}></Col>
                <Col xs='auto' className="my-1">
                  <InputGroup className="mb-1">
                    <Form.Control
                      placeholder="search username"
                      aria-label="user's username"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="secondary" id="button-addon2">
                      search
                    </Button>
                  </InputGroup>
                </Col>
              </Row>

          </Col>
          </header>
        </Container>
      </Navbar>
    </div>

      {/* <div className="logos">
          <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
        </div> */}
      <Outlet />
    </>
  )
};

export default Layout;