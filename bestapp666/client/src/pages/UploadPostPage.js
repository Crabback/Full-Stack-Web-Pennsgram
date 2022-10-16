import "../Styles.css";
import React from 'react';
import {Footer} from "../components/Footer";
import {SearchBar} from "../components/SearchBar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UploadPostPage() {
    return (
    <div className="home">
      <Row>
      <Col></Col>
      <Col>
      <Form>
          <Form.Group className="mb-3">
              <img src={require("../images/emptypic.png")} alt="user pic 1" width="400" height="400"></img>
          </Form.Group>
          <Button variant="primary" type="submit">
              Upload Media
          </Button>
      </Form>
      </Col>
      <Col>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea"
          placeholder="Description about the picture/video." 
          rows={3}/>
        </Form.Group>
      </Col>
      <Col></Col>
      </Row>
    </div>)
  }
export default UploadPostPage