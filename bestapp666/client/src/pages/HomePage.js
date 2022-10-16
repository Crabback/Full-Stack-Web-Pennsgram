import "../Styles.css";
import React from 'react';
import {Footer} from "../components/Footer";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HomePage() {
    return (
    <div >
      <div className="top_half_page">
        <div className="right">
          <p>Brief About the platform</p>
        </div>
        <div className="logos">
        </div>
        <div className="right">
          <Button variant="primary" type="submit">
            Start Your Journey
          </Button>
        </div>
      </div>
      <div className="bot_half_page">
        <p>Some moments from our users</p>
        <div className="pics">
          <Row>
          <Col>
            <Card style={{ width: '12rem' }}>
              <Card.Img variant="top" src={require("../images/amaz-post.png")} />
              <Card.Body>
                <Card.Title>User 1</Card.Title>
                <Card.Text>
                  Got my offer from Amazon today!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card style={{ width: '12rem' }}>
              <Card.Img variant="top" src={require("../images/apple-post.png")} />
              <Card.Body>
                <Card.Title>User 1</Card.Title>
                <Card.Text>
                  Got my offer from Apple today!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col>
          <Card style={{ width: '12rem' }}>
              <Card.Img variant="top" src={require("../images/meta-post.png")} />
              <Card.Body>
                <Card.Title>User 1</Card.Title>
                <Card.Text>
                  Got my offer from Meta today!
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          </Row>
        </div>
        <div className="bottom">
          <Footer />
        </div>
      </div>
    </div>)
  }
export default HomePage