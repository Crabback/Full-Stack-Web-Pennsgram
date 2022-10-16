import "../Styles.css";
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Footer} from "../components/Footer";

function RegisterPage() {
    return (
    <div className='home'>
        <div className="split left">
            <div className="centered">
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
                    <Form.Control type="DOB" placeholder="Date of Birth" />
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            </div>
        </div>

        <div className="split right">
            <div className="centered">
            <Form>
                <Form.Group className="mb-3">
                    <img src={require("../images/emptypic.png")} alt="user pic 1" width="200" height="200"></img>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Upload Your Profile Picture
                </Button>
            </Form>
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default RegisterPage