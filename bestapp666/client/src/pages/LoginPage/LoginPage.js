import React from 'react';
import {Footer} from "../../components/Footer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUser } from "../../api/mock_api";
import Nav from 'react-bootstrap/Nav';
import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import {addLoginUser, logoutAction} from './currentUserSlice'


//the compoent of a LoginForm which keep track of login username
function LoginForm(props){
  // local state
  const [newInput, setInput] = useState({ username: '', password: '' });

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
    // send GET request to fetch the Student by username
    const student = await getUser(newInput.username);
    if(student.length == 0){
      //login failed, due to wrong username cannot fetch data
      alert("Login failed due to unknown username!\n Please try one of these: tiger/trump/pig/dog/curry/ayesha/obama")
    }else{
      //login success!
        alert("Login Success! logged in as: \n\n" + JSON.stringify(student)); 
        console.log("Execute the code after clicking okay button of the alert window");
        props.updateAuthen(true);
        // then update state
        // store.dispatch(loginAs(student)); // dispatch action add student to store
    }
    
  };


  return(
  <Form onSubmit={handleLogin}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Username</Form.Label>
      <Form.Control name="username" onChange={handleOnChange} placeholder="Enter username (eg. dog)" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control name="password" onChange={handleOnChange} placeholder="Password" />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicCheckbox">
      <Form.Check type="checkbox" label="Remain login next time" />
    </Form.Group>
    <Button variant="primary" type="submit">
      Login
    </Button>
  </Form>
  );
}

//the largest scope state controling the routing 


function LoginPage() {
  const [authenticated, setAuthen] = useState(false);

  if(!authenticated){
    return (
      <div className="home">
      <Container>
        <Row md>
      
          <Col><label><p>Please input your username to login. eg: dog/trump/..refer to json file for available usernames</p></label></Col>
        </Row>
        <Row md>
          <Col></Col>
          <Col><LoginForm updateAuthen= {setAuthen}/></Col>
          <Col></Col>
        </Row>
        <Row ms>
          <Col>
              <div className="bot_half_page">
                  <Footer />
              </div>
          </Col>
        </Row>
      </Container>
      </div>
    )
  }else{
    return <Navigate replace to="/feed" />;
  }
    
}
export default LoginPage