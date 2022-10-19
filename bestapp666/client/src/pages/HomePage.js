import "../Styles.css";
import React from 'react';
import {Footer} from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { NavLink } from "react-router-dom";


function HomePage() {
var pigUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArC7oN3AWH3h8qHv5PYNoOrnKXdBMPph9JQ&usqp=CAU";
var dogUrl = "https://i.pinimg.com/736x/36/cd/ab/36cdabd55c158426997719b6f2fe00ad.jpg";
var catUrl = "https://bestfriends.org/sites/default/files/styles/five_col_rect_960x960_/public/feature-card/SampsonJessicaJess9655_square.jpg?itok=SE0pg8sC";
var tigerUrl = "https://i2-prod.dailyrecord.co.uk/incoming/article2299090.ece/ALTERNATES/s1200d/The-family-pose-for-a-picture-in-their-living-room-with-Tom-the-tiger.jpg";
    return (
    <div >
      <div className="background" style={{paddingLeft: "2rem"}}>
        <Row>
          <Col sm = {9}>
            <Row><h2 className="fw-bold">Brief About the Platform</h2></Row>
            <Row><p style={{paddingTop: "1rem", paddingBottom: "5rem"}}>Pennsgram is a platform where you can upload pictures and follow friends.</p></Row>
          </Col>
          <Col>
              <NavLink to="/register">
                <Button variant="primary" type="submit" style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                  Start Your Journey
                </Button>
              </NavLink>
          </Col>
          </Row>
      </div>

      <div className="bot_half_page" style={{paddingLeft: "2rem"}}>
        <Row style={{paddingBottom: "2rem"}}>
          <h3 className="fw-bold">Some moments from our users</h3>
        </Row>


          <Row>
            <Col>
              <Card style={{ height: '30rem', width: '20rem' }}>
                <Card.Img variant="top" src={pigUrl} className="home_img"/>
                <Card.Body>
                  <Card.Title>User 1</Card.Title>
                  <Card.Text>
                    Happy Pig!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Col>
            <Card style={{ height: '30rem', width: '20rem' }}>
                <Card.Img variant="top" src={dogUrl} className="home_img"/>
                <Card.Body>
                  <Card.Title>User 2</Card.Title>
                  <Card.Text>
                    Look at the dog!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col>
            <Card style={{ height: '30rem', width: '20rem' }}>
                <Card.Img variant="top" src={catUrl} className="home_img"/>
                <Card.Body>
                  <Card.Title>User 3</Card.Title>
                  <Card.Text>
                    Look at the cat!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

          </Row>
        </div>
        
        <div style={{paddingLeft: "2rem"}}>
        <Footer />
        </div>
      </div>)
  }
export default HomePage