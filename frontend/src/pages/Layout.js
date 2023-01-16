import React, { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUser, login, lock, restoreAuth } from "../fetcher";
import ReactRoundedImage from "react-rounded-image";
import { useSelector, useDispatch } from 'react-redux'
import { logoutAction, updateCurrentUser, selectCurrentUser } from './UserPage/currentUserSlice'

function LoginLink() {
  const dispatch = useDispatch();
  const stateCurrentUser = useSelector(selectCurrentUser);

  const handleLinkOnClick = async (e) => {
    dispatch(logoutAction());
    sessionStorage.removeItem('app-token');
    alert('Logged out!');
   //await logout(stateCurrentUser.username, stateCurrentUser.password);
    console.log("currentuser " + stateCurrentUser.username + " has logged out: ");
  };

  if (stateCurrentUser.username === "NOT_A_USER") {
    return (<NavLink to="/login" className='headers'>{"Login"}</NavLink>);
  } else {
    return (<NavLink onClick={handleLinkOnClick} to="/login" className='headers'>Logout</NavLink>);
  }
}


function Layout() {
  const [authenticated, setAuthen] = useState(sessionStorage.getItem('app-token') !== null);
  console.log(sessionStorage, authenticated);
  
  const dispatch = useDispatch();
  const restoreLogin = async (token) => {
    try{
      const user = await restoreAuth(token);
      dispatch(updateCurrentUser(user));
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(authenticated){
      restoreLogin(sessionStorage.getItem('app-token'));
    }
  }, []);


  const stateCurrentUser = useSelector(selectCurrentUser);
  const username = stateCurrentUser.username;
  const avatar = stateCurrentUser.avatar;

  return (
    <>
      {/* the pages Nav for development use */}
      <NavBar />

      <div className="background">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Col sm={6}></Col>
            <Col>
              <Nav className="justify-content-end" activeKey="/">
                <Nav.Item>
                  <NavLink to={'/user/' + username}>
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
                <Nav.Item> <NavLink to={'/user/' + username} className='headers'>{username}</NavLink></Nav.Item>
                <Nav.Item> <NavLink to={'/feed'} className='headers'>Feed</NavLink></Nav.Item>
                <Nav.Item> <NavLink to="/register" className='headers'>Sign up</NavLink></Nav.Item>
                {/* handle login to logout */}
                <Nav.Item> <LoginLink /> </Nav.Item>
                <Nav.Item> <NavLink to="" className='headers'>Home</NavLink></Nav.Item>
                <Nav.Item> <NavLink eventKey="disabled" className='headers' disabled> Contact Us </NavLink> </Nav.Item>
              </Nav>
            </Col>
          </Container>
        </Navbar>

        <Row>
          <Col sm={8}>
            <NavLink to="">
              <Navbar.Brand style={{ paddingLeft: "rem" }}>
                <img src={"https://drive.google.com/uc?export=view&id=1g1nSkhBDmERAMY12iuN6EksYF9AZElc2"} alt="logo" width="527" height="149"></img>
              </Navbar.Brand>
            </NavLink>
          </Col>
          <Col> <SearchBar /> </Col>
        </Row>

        <Row style={{ paddingTop: "5rem", paddingLeft: "rem" }}></Row>
      </div>

      <Outlet />
    </>
  )
};

export default Layout;