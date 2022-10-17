import "../Styles.css";
import React, { useState } from 'react';
import {Footer} from "../components/Footer";
import {SearchBar} from "../components/SearchBar";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UploadPostPage() {
  const [media, setMedia] = useState(require("../images/emptypic.png"));
    
  function handleChange(e) {
    setMedia(URL.createObjectURL(e.target.files[0]));
  }
    return (
    <div className="home">
      <Row>
      <Col sm={1}></Col>
      <Col>
      <Form>
          <Form.Group className="mb-3">
              <img src={media} alt="user pic 1" width="400" height="400"></img>
          </Form.Group>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Upload Media</Form.Label>
            <Form.Control type="file" onChange={handleChange}/>
          </Form.Group>
      </Form>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
          placeholder="Description about the picture/video." 
          rows={3}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          <Nav.Link href="/user">Upload</Nav.Link>
        </Button>
      </Col>
      <Col sm={1}></Col>
      </Row>
    </div>)
  }
export default UploadPostPage