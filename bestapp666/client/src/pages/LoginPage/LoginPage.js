import React from 'react';
import { Footer } from "../../components/Footer";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { getUser } from "../../api/mock_api";

import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch, Provider} from 'react-redux'
import {addLoginUser, logoutAction, selectCurrentUser} from '../UserPage/currentUserSlice'


//the compoent of a LoginForm which keep track of login username
function LoginForm(props){
  // local state
  const stateCurrentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

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
    const userRoster = await getUser(newInput.username);
    //get the user object
    let user;
    userRoster.forEach(element => {
      user = element;
    });

    if(user == undefined){
      //login failed, due to wrong username cannot fetch data
      alert("Login failed due to unknown username!\n Please try one of these: tiger/trump/pig/dog/curry/ayesha/obama")
    }else{
      //login success!

        // then update state
        // store.dispatch(loginAs(student)); // dispatch action add student to store
        console.log(`before dispatch: ${stateCurrentUser.username}`);
        dispatch(addLoginUser(user));

        alert("Login Success! logged in as: \n\n" + JSON.stringify(userRoster)); 
        console.log("Execute the code after clicking okay button of the alert window");
        props.updateAuthen(true);
        
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
      {/* <Form.Check type="checkbox" label="Remain login next time" /> */}
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
      <div className="background">
      <Container>
        <Row md>
      
          <Col><label></label></Col>
        </Row>
        <Row md>
          <Col></Col>
          <Col><LoginForm updateAuthen= {setAuthen}/></Col>
          <Col></Col>
        </Row>
        <Row ms>
        </Row>
      </Container>
      <div style={{paddingLeft: "2rem", paddingTop: "5rem"}}>
        <Footer />
        </div>
      </div>
    )
  }else{
    return <Navigate replace to="/user/true/self" />;
  }
    
}
export default LoginPage