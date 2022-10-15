import React, { useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';


export default function UserPageNew(props) {
  return (
    <Container>
      <Row >
        <Col md={1}>1 of 3</Col>
        <Col md={9}>
            <Stack direction="verticle" gap={3}>
                <div className="bg-light border ms-auto">First item</div>
                <div className="bg-light border ms-auto">Second item</div>
            </Stack>
        </Col>
        <Col md={1}>3 of 3</Col>
      </Row>
    </Container>
  );
}