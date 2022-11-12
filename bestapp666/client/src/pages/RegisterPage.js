import "../Styles.css";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Footer} from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { createNewUser } from "./../api/mock_api";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState("https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067");
    
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
    };
    function addDefaultImgSrc(ev){
        ev.target.src = "https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067";
        setProfilePic("https://img.wattpad.com/8f19b412f2223afe4288ed0904120a48b7a38ce1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f5650722d38464e2d744a515349673d3d2d3234323931353831302e313434336539633161633764383437652e6a7067");
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
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        //1. the info: username, password
            //verify the password match or not
        if(infoInput.password !== infoInput.passwordConfirm){
            alert("Password unmatched!");
        }else{
            const newUser = {
                "username" : infoInput.username, 
                "password" : infoInput.password, 
                "followings" : [],
                "followers" : [],
                "avatar" : profilePic,
                "posts" : [],
                "followerSuggestions": []
            };
            console.log(newUser.avatar);
            try{
                createNewUser(newUser);    
            }catch(err){
                alert("register adding newUser failed: " +  err);
            }
            alert("Register success with username: "+ newUser.username);
            navigate("/login");
        }
    };

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

                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
            </Form>
        </Col>
        <Col sm={1}></Col>
        <Col sm={5}>
            <Form onSubmit={handleUrlUpload}>
                <Form.Group className="mb-3">
                    <img onError={addDefaultImgSrc} src={profilePic} alt="user pic 1" width="250" height="250"></img>
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