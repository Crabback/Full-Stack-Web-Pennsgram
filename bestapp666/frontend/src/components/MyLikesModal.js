import "../Styles.css";
import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export function MyLikesModal(props) {
    const likes = props.post.likes;
    const likesList = likes.length === 0 ? []: likes.map((l)=>{
      return (
        <>
          <div className="bg-light border">
            <Row>
              <Col><h4>{l}</h4></Col>
            </Row> 
              </div>
        </>
      )
    }) ;
  
    return (
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Likes
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Stack gap={3}>
                {likesList}
            </Stack>
          
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }