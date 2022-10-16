import React from 'react';
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

const Layout = () => {
  return (
    <>
    
    {/* the pages Nav for development use */}
    <div>
        <Nav defaultActiveKey="/" as="ul">
          <Nav.Item as="li">
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/user">UserPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/userNew">UserPageNew</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/register">SignupPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/browse">BrowsePage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/login">LoginPage</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link href="/feed">FeedPage</Nav.Link>
          </Nav.Item>
        </Nav>
    </div>

    {/* the logo "brand" bar */}
    <div className="top_half_page">
    <Navbar>
        <Container>
          <Navbar.Brand href="#home">
          <img src={require("../images/pennsgram_logo.png")} alt="logo" width="468" height="132"></img>
          </Navbar.Brand>
          <header>
          <Container>
              <Row xs='auto'>
                <Col>
                  <ReactRoundedImage
                    image={MyPhoto}
                    roundedColor="#321124"
                    imageWidth="100"
                    imageHeight="100"
                    roundedSize="2"
                    borderRadius="100"
                  />
                </Col>
              </Row>
              <Row>
                <Col><strong> UserName</strong></Col>
              </Row>
          </Container>
          </header>
        </Container>
      </Navbar>
    </div>

    <div className="top_half_page">
      <Nav className="justify-content-end" activeKey="/">
        <Nav.Item>
          <Nav.Link href="/register">Sign Up</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="link-2">about</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            contact us
          </Nav.Link>
        </Nav.Item>
    
      </Nav>
      </div>

      {/* the search bar */}
      <div className="top_half_page">
        <Row className="align-items-center">
          <Col xm='auto'></Col>
          <Col xs='auto' className="my-1">
            <InputGroup className="mb-1">
              <Form.Control
                placeholder="username"
                aria-label="user's username"
                aria-describedby="basic-addon2"
              />
              <Button variant="secondary" id="button-addon2">
                search
              </Button>
            </InputGroup>
          </Col>
          <Col xs='auto'></Col>
        </Row>
      </div>

      {/* <div className="logos">
          <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
        </div> */}
      <Outlet />
    </>
  )
};

export default Layout;