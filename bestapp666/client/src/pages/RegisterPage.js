import "../Styles.css";
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Footer} from "../components/Footer";
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function RegisterPage() {
    const [profilePic, setProfilePic] = useState(require("../images/emptypic.png"));
    
    function handleChange(e) {
        setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
    
    return (
    <div className='home'>
        <Row>
        <Col sm={1}></Col>
        <Col sm={5}>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="firstname" placeholder="First Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="lastname" placeholder="Last Name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDOB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Date of Birth" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Username" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    <Nav.Link href="/login">Submit</Nav.Link>
                </Button>
            </Form>
        </Col>
        <Col sm={1}></Col>
        <Col sm={5}>
            <Form>
                <Form.Group className="mb-3">
                    <img src={profilePic} alt="user pic 1" width="250" height="250"></img>
                </Form.Group>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <Form.Control type="file" onChange={handleChange}/>
                </Form.Group>
            </Form>
        </Col>
        </Row>
        <Footer />
    </div>
    );
}

export default RegisterPage