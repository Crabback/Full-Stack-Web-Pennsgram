import "../Styles.css";
import React, { useState } from 'react';
import { addComment, deletePost, deleteComment, updateComment} from "../api/mock_api";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { MentionsInput, Mention } from 'react-mentions'

export function MyCommentsModal(props) {
    const comments = props.post.comments;
    const [editShow, setEditShow] = useState(false);
    const [editInput, setEditInput] = useState("");
    const [beingEdit, setBeingEdit] = useState("");
    const [mentionInput, setMentionInput] = useState("");

    async function handleUpdateComment(e, postId, oldComment, newComment, mention){
        e.preventDefault();
        try{
            await updateComment(postId, oldComment, newComment, mention);
            // tell my grandparent to refresh the page 
            props.setEditedAndRefreshCards(!props.oldEditedAndRefreshCards);
            alert("update comment successful!");
        }catch(err){
            console.log("update comment failed.");
            alert("update comment failed.");
        }
        //setEditedAndRefreshCards to trigger rerender and data fetching
        props.setEditedAndRefreshCards(!props.oldEditedAndRefreshCards);
        //setShow(false);
        props.onClose(false);
    };

    async function handleDeleteComment(target, postId, content){
      try{
          await deleteComment(postId, content);
           // tell my grandparent to refresh the page 
          props.setEditedAndRefreshCards(!props.oldEditedAndRefreshCards);
          alert("Delete comment successful!");
      }catch(err){
          console.log("Delete comment failed.");
          alert("Delete comment failed.");
      }
  };
  
    const commentsList = comments.length === 0 ? []: comments.map((c)=>{
      return (
        <>
          <div className="bg-light border">
            <Row>
              <Col><h4>{c.author}</h4></Col>
              <Col >
                <p>{c.comment + " "} 
                  <NavLink to={"/user/"+c.mention.replace(')', '').split("(")[1]} className="button_text">
                    {c.mention.split("(")[0]}
                  </NavLink>
  
                  {c.author === props.username && (
                  <Button onClick={(e) => {setEditShow(current => !current);setBeingEdit(c.comment)}} style={{float: 'right'}} >Edit</Button>
                  )}
  
                  {c.author === props.username && (
                  <Button variant="outline-danger" onClick={(e) => handleDeleteComment(e.target, props.post.id, c.comment)} style={{float: 'right'}} >Delete</Button>
                  )}
  
                  {editShow && c.author === props.username && c.comment == beingEdit && (
                  <Form onSubmit={(e) => handleUpdateComment(e, props.post.id, c.comment, editInput, mentionInput)}>
                      <Form.Group className="mb-3" controlId="formBasicDescription">
                      <Form.Control as="textarea" onChange={e => setEditInput(e.target.value)}
                        placeholder="Edit your comment." 
                        rows={2}
                        value={editInput}/>
                      </Form.Group>
                      <MentionsInput value={mentionInput} onChange={e => setMentionInput(e.target.value)} placeholder={"Mention people using '@'"}>
                        <Mention
                          trigger="@"
                          data={(search) => [{ id: search, display: search }]}
                        />
                      </MentionsInput>
                      <Row style={{paddingBottom:'1rem'}}></Row>
                      <Button variant="primary" type="submit">
                        Done
                      </Button>
                  </Form>
                  )}
                  
                </p>
              </Col>
            </Row>
              </div>
        </>
      )
    }) ;
  
    return (
      <>
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
  
      </>
  
    );
  }
