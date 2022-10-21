import "../Styles.css";
import React, { useState } from 'react';
import {Footer} from "../components/Footer";
import {SearchBar} from "../components/SearchBar";
import { NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {addLoginUser, logoutAction, selectCurrentUser} from './UserPage/currentUserSlice'
import { useSelector, useDispatch } from 'react-redux'

function UploadPostPage() {
  const [media, setMedia] = useState(require("../images/emptypic.png"));
  const stateCurrentUser = useSelector(selectCurrentUser);

  const [urlInput, setUrlInput] = useState("");

  const handleImageURLInput = (e) => {
    if (e.target.name === "imageURL") {
      setUrlInput((state) => (e.target.value));
    }}

  const handlePostUpload = (e) => {
    e.preventDefault();
  };
    
  function handleChange(e) {
    setMedia(URL.createObjectURL(e.target.files[0]));
  }

return (
<div className="background">
  <Row>
  <Col ></Col>

  <Form onSubmit={handlePostUpload}>
    <Row>
  <Col >
      <Form.Group className="mb-3">
              <img src={media} alt="user pic 1" width="400" height="400"></img>
      </Form.Group>
      <Form.Group controlId="formFile" className="mb-3" style={{paddingRight: "30%"}}>
        <Form.Label>Upload Media</Form.Label>
        <Form.Control type="file" onChange={handleChange}/>
        <Form.Control name="imageURL" onChange={handleImageURLInput} placeholder="Enter online image url" />
      </Form.Group>

  </Col>
  <Col>
    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
      placeholder="Description about the picture/video." 
      rows={3}/>
    </Form.Group>

       
          <NavLink to={"/user/"+stateCurrentUser.username} className="button_text">
    <Button variant="primary" type="submit">
      Upload
    </Button>
          </NavLink>

  </Col>
  </Row>
  </Form>
  <Col sm={1}></Col>
  </Row>
  <div style={{paddingLeft: "2rem", paddingTop: "5rem"}}>
    <Footer />
  </div>
</div>)
}
export default UploadPostPage