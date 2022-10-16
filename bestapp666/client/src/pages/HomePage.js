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
      <div className="top_half_page">
        <Row>
          <Col sm={1}></Col>

          <Col>
          <Row><p>Brief About the platform</p></Row>
          <Row><p>Pennsgram is a platform where you can upload pictures and follow friends</p></Row>
          <Row>
          <Col>
          <Button variant="primary" type="submit">
            <Nav.Link href="/register">Start Your Journey</Nav.Link>
          </Button>
          </Col>
          </Row>
          </Col>
        </Row>
      </div>

      <div className="bot_half_page">
        <Row>
        <h4> Some moments from our users </h4>
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