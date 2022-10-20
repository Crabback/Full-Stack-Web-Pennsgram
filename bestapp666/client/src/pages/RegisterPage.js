import "../Styles.css";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Footer} from "../components/Footer";
import { NavLink } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function RegisterPage() {
    const [profilePic, setProfilePic] = useState(require("../images/emptypic.png"));
    
    function handleChange(e) {
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
    
    const [urlInput, setUrlInput] = useState("");

    const handleImageURLInput = (e) => {
      if (e.target.name === "imageURL") {
        setUrlInput((state) => (e.target.value));
      }}
    const handleUrlUpload = (e) => {
        e.preventDefault();
        setProfilePic(urlInput);
    }


    //handle the temporary inputs in the userInfo form 
    const [infoInput, setInfoInput] = useState({ username: '', password: '' , passwordConfirm: ''});
    const handleInfoInput = (e) =>{
        if (e.target.name === "username") {
            setInfoInput((state) => ({
              username: e.target.value,
              password: state.password,
              passwordConfirm: state.passwordConfirm
            }));
          }
          if (e.target.name === 'password') {
            setInfoInput((state) => ({
              username: state.username,
              password: e.target.value,
              passwordConfirm: state.passwordConfirm
            }));
          }
          if (e.target.name === 'passwordConfirm') {
            setInfoInput((state) => ({
              username: state.username,
              password: state.password,
              passwordConfirm: e.target.value
            }));
          }
    }

    const handleRegister = (e) => {
        e.preventDefault();
        //1. the info: username, password
            //verify the password match or not
        //2. the profilePic
        
    }

    return (
    <div className='background'>
        <Row>
        <Col sm={1}></Col>
        <Col sm={5}>
            <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control name="firstname" onChange={handleInfoInput} placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control name="lastname" onChange={handleInfoInput} placeholder="Last Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select >
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control name="birth" onChange={handleInfoInput} placeholder="Date of Birth" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" onChange={handleInfoInput} placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" onChange={handleInfoInput} placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={handleInfoInput} placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="passwordConfirm" onChange={handleInfoInput} placeholder="Confirm Password" />
                </Form.Group>

                
                <NavLink to="/login">
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </NavLink>
            
            </Form>
        </Col>
        <Col sm={1}></Col>
        <Col sm={5}>
            <Form onSubmit={handleUrlUpload}>
                <Form.Group className="mb-3">
                    <img src={profilePic} alt="user pic 1" width="250" height="250"></img>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3" style={{paddingRight: "50%"}}>
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleChange}/>
                    {/* input for uploading url image */}
                    <Form.Control name="imageURL" onChange={handleImageURLInput} placeholder="Enter online image url" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload avatar
                 </Button>
            </Form>
        </Col>
        </Row>
        <div style={{paddingLeft: "2rem"}}>
        <Footer />
        </div>
    </div>
    );
}

export default RegisterPage