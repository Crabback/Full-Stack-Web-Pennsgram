import React, { useState, useEffect } from "react";
import { Footer } from "../components/Footer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUser, login, lock, restoreAuth } from "../fetcher";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { updateCurrentUser, selectCurrentUser } from './UserPage/currentUserSlice'


//the compoent of a LoginForm which keep track of login username
function LoginForm(props) {

  const dispatch = useDispatch();
  //console.log(sessionStorage.removeItem('lock-token'));

  // local state
  const stateCurrentUser = useSelector(selectCurrentUser);
  const [newInput, setInput] = useState({ username: '', password: '' });
  const [fails, setFails] = useState(1);

  const handleOnChange = (e) => {
    if (e.target.name === "username") {
      setInput((state) => ({
        username: e.target.value,
        password: state.password,
      }));
    }
    if (e.target.name === 'password') {
      setInput((state) => ({
        username: state.username,
        password: e.target.value,
      }));
    }
  };

  //here login means fetch the user by username from the mock api
  const handleLogin = async (e) => {

    e.preventDefault();

    try {
      const results = await login(newInput.username, newInput.password);
      if (results.data.data === null) {
        alert(results.data.message);
        setFails(fails + 1);
      } else {
        let user = results.data.data
        dispatch(updateCurrentUser(user));
        alert("Login Success! logged in as: " + JSON.stringify(user.username));
        props.updateAuthen(sessionStorage.getItem('app-token') !== null);
      }
    } catch (err) {
      console.log(err);
      setFails(fails + 1);
    }

    console.log(fails);
    if (fails >= 3) {
      //lock the account
      await lock(newInput.username);
      setFails(1);
    }
  };


  return (
    <Form id="submitForm" onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" onChange={handleOnChange} placeholder="Enter username (eg. dog)" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" onChange={handleOnChange} placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
}

//the largest scope state controling the routing 


function LoginPage() {
  const [authenticated, setAuthen] = useState(sessionStorage.getItem('app-token') !== null);
  console.log(sessionStorage, authenticated);

  if (!authenticated) {
    return (
      <div className="background">
        <Container>
          <Row md>

            <Col><label></label></Col>
          </Row>
          <Row md>
            <Col></Col>
            <Col><LoginForm updateAuthen={setAuthen} /></Col>
            <Col></Col>
          </Row>
          <Row ms>
          </Row>
        </Container>
        <div style={{ paddingLeft: "2rem", paddingTop: "5rem" }}>
          <Footer />
        </div>
      </div>
    )
  } else {
    return <Navigate replace to={'/feed'} />;
  }

}
export default LoginPage