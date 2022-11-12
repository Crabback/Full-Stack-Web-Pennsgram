import "../Styles.css";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {LikeButton} from './LikeButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactRoundedImage from "react-rounded-image";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MentionsInput, Mention } from 'react-mentions'
import { addComment} from "../api/mock_api";
import { Nav } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import { getUserAvatar } from "../api/mock_api";

const popover = (
  <Popover id="popover-basic">
    <Popover.Header as="h3">Popover right</Popover.Header>
    <Popover.Body>
      And here's some <strong>amazing</strong> content. It's very engaging.
      right?
    </Popover.Body>
  </Popover>
);

function MyCommentsModal(props) {
  console.log("props: shi : ", props.post);
  const comments = props.post.comments;
  const commentsList = comments.length === 0 ? []: comments.map((c)=>{
    return (
      <>
        <div className="bg-light border">
          <Row>
            <Col><h4>{c.author}</h4></Col>
            <Col ><p>{c.comment}</p></Col>
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
          Comments
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
          <Stack gap={3}>
              {commentsList}
          </Stack>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export function CardCustomedUserPage(props) {
    const [modalShow, setModalShow] = useState(false);
    const navigate = useNavigate();
    const [descInput, setDescInput] = useState("");
    const [mentionInput, setMentionInput] = useState("");
  
    const handleLeaveComment= async (e) => {
      e.preventDefault();
      if(props.username === "NOT_A_USER"){
        alert("Please sign up/login to your account in order to make a post.");
        navigate("/");
      }else{
        const newComment = {
          "author": props.username,
          "comment": descInput,
          "mention": mentionInput
        }
        await addComment(props.post.id, newComment);
      }
      setDescInput('');
      setMentionInput('');
    }
  
      if (props.post) {
        if(props.post.image.split(".").slice(-1) == 'mp4'){
          return (
            <>
            <Card bg = "light" style={{ width: '24rem'}}>

              <video width='446' controls > <source src={props.post.image} type="video/mp4"/> </video>  
             
              <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> 
                {props.post.date}
              </Card.Subtitle>
    
              <Card.Body>
                <Card.Text>{props.post.description} </Card.Text>
                
                <Row style={{paddingBottom: "1rem"}}>
                  <Col> 
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                          <Button variant="light"><Card.Text > {props.post.likes.length} likes </Card.Text> </Button>
                        </OverlayTrigger>
                    
                  </Col>
                  <Col> <Button variant="light" onClick={() => setModalShow(true) }> <Card.Text> {props.post.comments.length} comments </Card.Text></Button> </Col>
                </Row>
  
                <ButtonGroup aria-label="like,comment,message">
                    <LikeButton post = {props.post} username={props.username}/>
                    <Button className="mb-2" variant="outline-primary">Comment</Button>
                    <Button className="mb-2" onClick={() => {
                      props.setVisibility(true);
                      props.setPostBeingEdited(props.post);
                      }}>{"edit"}</Button>
                </ButtonGroup>
  
                <Form onSubmit={handleLeaveComment}>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Control as="textarea" onChange={e => setDescInput(e.target.value)}
                      placeholder="Leave a comment." 
                      rows={2}
                      value={descInput}/>
                    </Form.Group>
                  </Row>
                  <Row style={{paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem'}}>
                    <MentionsInput value={mentionInput} onChange={e => setMentionInput(e.target.value)} placeholder={"Mention people using '@'"}>
                        <Mention
                          trigger="@"
                          data={(search) => [{ id: search, display: search }]}
                        />
                      </MentionsInput>
                  </Row>
                  <Row>
                    <Button variant="primary" type="submit">
                      Comment
                    </Button>
                  </Row>
                </Form>
  
              </Card.Body>
    
            </Card>
             {/* //pop up modal */}

             <MyCommentsModal
             show={modalShow}
             onHide={() => setModalShow(false)}
             post={props.post}
             />
         </>
            )
        }
        else{
          return (
          <>
            <Card bg = "light" style={{ width: '24rem'}}>
    
              <Card.Img variant="bottom" rounded="true" src={props.post.image} />
              <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> {props.post.date} </Card.Subtitle>
    
              <Card.Body>
                <Card.Text>{props.post.description} </Card.Text>
                
                <Row style={{paddingBottom: "1rem"}}>
                  <Col> 
                        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                          <Button variant="light"><Card.Text > {props.post.likes.length} likes </Card.Text> </Button>
                        </OverlayTrigger>
                    
                  </Col>
                  <Col> <Button variant="light" onClick={() => setModalShow(true) }> <Card.Text> {props.post.comments.length} comments </Card.Text></Button> </Col>
                </Row>
  
                <ButtonGroup aria-label="like,comment,message">
                    <LikeButton post = {props.post} username={props.username}/>
                    <Button className="mb-2" variant="outline-primary" onClick={() => {
                      props.setPostBeingEdited(props.post);
                      props.setVisibility(true);
                      props.setEditPanel(false);
                      }}>Comment</Button>
                    <Button className="mb-2" onClick={() => {
                      props.setPostBeingEdited(props.post);
                      props.setVisibility(true);
                      props.setEditPanel(true);
                      }}>{"edit"}</Button>
                </ButtonGroup>
  
                <Form onSubmit={handleLeaveComment}>
                  <Row>
                    <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Control as="textarea" onChange={e => setDescInput(e.target.value)}
                      placeholder="Leave a comment." 
                      rows={2}
                      value={descInput}/>
                    </Form.Group>
                  </Row>
                  <Row style={{paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem'}}>
                    <MentionsInput value={mentionInput} onChange={e => setMentionInput(e.target.value)} placeholder={"Mention people using '@'"}>
                        <Mention
                          trigger="@"
                          data={(search) => [{ id: search, display: search }]}
                        />
                      </MentionsInput>
                  </Row>
                  <Row>
                    <Button variant="primary" type="submit">
                      Comment
                    </Button>
                  </Row>
                </Form>
              </Card.Body>
            </Card>

            {/* //pop up modal */}

            <MyCommentsModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            post={props.post}
            />
        </>
            )
        }
      }
  
  }
