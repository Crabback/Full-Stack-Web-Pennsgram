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

export function CardCustomedUserPage(props) {
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
            <Card bg = "light" style={{ width: '24rem'}}>

              <video width='446' controls > <source src={props.post.image} type="video/mp4"/> </video>  
             
              <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> 
                {props.post.date}
              </Card.Subtitle>
    
              <Card.Body>
                <Card.Text>{props.post.description} </Card.Text>
                
                <Row>
                  <Col> <Card.Text > {props.post.likes.length} likes </Card.Text> </Col>
                  <Col> <Card.Text> {props.post.comments.length} comments </Card.Text> </Col>
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
            )
        }
        else{
          return (
            <Card bg = "light" style={{ width: '24rem'}}>
    
              <Card.Img variant="bottom" rounded="true" src={props.post.image} />
              <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> {props.post.date} </Card.Subtitle>
    
              <Card.Body>
                <Card.Text>{props.post.description} </Card.Text>
                
                <Row style={{paddingBottom: "1rem"}}>
                  <Col> <Card.Text > {props.post.likes.length} likes </Card.Text> </Col>
                  <Col> <Card.Text> {props.post.comments.length} comments </Card.Text> </Col>
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
            )
        }
      }
  
  }
