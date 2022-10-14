import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';

function FeedPage() {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Title>Following 1</Card.Title>
      <Card.Img variant="top" src={require("./tiger.jpeg")} />
      <Card.Body>
        <Card.Text>
          Some description about the post.
        </Card.Text>
        <ButtonGroup aria-label="like,comment,message">
            <Button variant="light">🥰</Button>
            <Button variant="light">💬</Button>
            <Button variant="light">✉️</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default FeedPage;