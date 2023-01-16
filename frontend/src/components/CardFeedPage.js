import "../Styles.css";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {LikeButton} from './LikeButton';
import {MyCommentsModal} from './MyCommentsModal';
import {MyLikesModal} from './MyLikesModal';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactRoundedImage from "react-rounded-image";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MentionsInput, Mention } from 'react-mentions'
import { addComment} from "../fetcher";
import { Nav } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export function CardFeedPage(props) {
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);
    const [likeModalShow, setlikeModalShow] = useState(false);

    const [descInput, setDescInput] = useState("");
    const [mentionInput, setMentionInput] = useState("");
    //const [offset, setOffset] = useState(0);
    //const [offsetComment, setOffsetComment] = useState(0);

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
        //setOffsetComment(offsetComment+1);
        props.setEditedAndRefreshCards(!props.oldEditedAndRefreshCards);
        alert("commented successful!");
      }
      setDescInput('');
      setMentionInput('');
    }

      if (props.post && !props.post.private) {
          return (
            <>
            <Card bg = "light" style={{ width: '28rem'}}>
              <Navbar bg="dark" variant="dark">
                <Container>
                  <Nav bg="dark" className="justify-content-end" activeKey="/">
                    <Nav.Item>
                      <NavLink to={'/user/'+props.post.author}>
                        <ReactRoundedImage image={props.post.avatar} roundedColor="#ffffff" imageWidth="35" imageHeight="35" roundedSize="2" borderRadius="20" />
                      </NavLink>
                    </Nav.Item>
                    <Nav.Item> <NavLink to={'/user/'+props.post.author} className='headers'><strong>{props.post.author}</strong></NavLink> </Nav.Item>
                  </Nav>
                </Container>
              </Navbar>
  
              {(props.post.image.split(".").slice(-1) == 'mp4') &&
            <video width='446' controls > <source src={props.post.image} type="video/mp4"/> </video>  
            }

            {(props.post.image.split(".").slice(-1) != 'mp4') &&
             <>
                <Card.Img variant="bottom" rounded="true" src={props.post.image} />
                <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> {props.post.date} </Card.Subtitle>
             </>
            }

              <Card.Body>
                <Card.Text>{props.post.description} </Card.Text>
                
                <Row>
                  <Col>
                  <Button variant="light" onClick={() => setlikeModalShow(true) }><Card.Text> {props.post.likes.length} likes </Card.Text></Button>
                  </Col>
                  <Col>
                  <Button variant="light" onClick={() => setModalShow(true) }> <Card.Text> {props.post.comments.length} comments </Card.Text> </Button>
                  </Col>
                </Row>
  
                <ButtonGroup aria-label="like,comment,message">
                    <LikeButton post = {props.post} username={props.username}
                        setEditedAndRefreshCards={props.setEditedAndRefreshCards} oldEditedAndRefreshCards={props.oldEditedAndRefreshCards}
                    />
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

        <MyCommentsModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        post={props.post} 
        // pass the setState hook from my parent to my child
        setEditedAndRefreshCards={props.setEditedAndRefreshCards} oldEditedAndRefreshCards={props.oldEditedAndRefreshCards}
        username={props.username}/>

        <MyLikesModal
        show={likeModalShow}
        onHide={() => setlikeModalShow(false)}
        post={props.post}
        />

        </>
            )
        
      }
  
  }
