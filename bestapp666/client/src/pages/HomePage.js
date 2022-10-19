import "../Styles.css";
import React from 'react';
import {Footer} from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Navigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';


function HomePage() {
    return (
    <div >
      <div className="background" style={{paddingLeft: "2rem"}}>
        <Row>
          <Col sm = {9}>
            <Row><h2 className="fw-bold">Brief About the platform</h2></Row>
            <Row><p style={{paddingTop: "1rem", paddingBottom: "5rem"}}>Pennsgram is a platform where you can upload pictures and follow friends.</p></Row>
          </Col>
          <Col>
            <Button variant="primary" type="submit" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
              <Nav.Link href="/register">Start Your Journey</Nav.Link>
            </Button>
          </Col>
          </Row>
      </div>

      <div className="bot_half_page" style={{paddingLeft: "2rem"}}>
        <Row style={{paddingBottom: "2rem"}}>
          <h3 className="fw-bold">Some moments from our users</h3>
        </Row>


          <Row>
            <Col>
              <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArC7oN3AWH3h8qHv5PYNoOrnKXdBMPph9JQ&usqp=CAU"} />
                <Card.Body>
                  <Card.Title>User 1</Card.Title>
                  <Card.Text>
                    Happy Pig!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={"https://i.pinimg.com/736x/36/cd/ab/36cdabd55c158426997719b6f2fe00ad.jpg"} />
                <Card.Body>
                  <Card.Title>User 2</Card.Title>
                  <Card.Text>
                    Look at the dog!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
            <Card style={{ width: '12rem' }}>
                <Card.Img variant="top" src={"https://bestfriends.org/sites/default/files/styles/five_col_rect_960x960_/public/feature-card/SampsonJessicaJess9655_square.jpg?itok=SE0pg8sC"} />
                <Card.Body>
                  <Card.Title>User 3</Card.Title>
                  <Card.Text>
                    Look at the pig!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </div>
        
        <Footer />
      </div>)
  }
export default HomePage