import React from "react";
import popupStyles from "./post-popup.module.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image'
import {deletePost, getComments} from "../../api/mock_api";
import { NavLink } from "react-router-dom";

const CustomPopup = (props) => {
    const [show, setShow] = useState(false);

    const [id, setId] = useState(-1);
    const [author, setAuthor] = useState("");
    const [image, setImage] = useState("");
    const [comments, setComments] = useState([]);
    const [description, setDescription] = useState("");

   //handle the temporary inputs in the post description 
    const [descInput, setDescInput] = useState("");

    const doneHandler = (e) => {
        // update the database and dispatch currentUser
        //remember set descInput
        setShow(false);
        props.onClose(false);
    };

    const closeHandler = (e) => {
        setShow(false);
        props.onClose(false);
    };
    useEffect(() => {
        setShow(props.show);
        const post = props.post;
        setId(post.id);
        setAuthor(post.author);
        setImage(post.image);
        setComments(post.comments);
        setDescription(post.description);
        setDescInput(description);
        console.log("current post: ", props.post);
        }, [props.show]);
        

    const handleDescInput = (e) =>{
        setDescInput( e.target.value);
    };
    
    const handleDeleteComment = (e) =>{
    };

    const handleDeletePost = async (e) =>{
        await deletePost();
    }

    const commentsToast = (comments?  comments : [{"author": "Void",
                                                    "comment": "No comments",
                                                    "mention": "@[NOT_A_USER](NOT_A_USER)"}]
    ).map((p, idx) => {
        console.log(p);
        return (
        <Toast onClose={() => handleDeleteComment()} delay={3000}  className="d-inline-block m-1" bg={"light"} key={idx}>
            <Toast.Header>
                <img src="holder.js/20x20?text=%20" className="rounded me-2" alt=""/>
                <strong className="me-auto">{p.author}</strong>
                <small>11 mins ago</small>
            </Toast.Header>
            <Toast.Body >
                {p.comment + " "} 
                <NavLink to={"/user/"+p.mention.replace(')', '').split("(")[1]} className="button_text">
                    {p.mention.split("(")[0]}
                </NavLink>
            </Toast.Body>
        </Toast>
    )});




    return (
        <div style={{visibility: show ? "visible" : "hidden", opacity: show ? "1" : "0"}} className={popupStyles.overlay}>
        <div className={popupStyles.popup}>
            <Button variant="outline-danger">Delete Post</Button>

            <span className={popupStyles.close} onClick={closeHandler}>
            <span className={popupStyles.done} onClick={doneHandler}>Done</span>
            &times;
            </span>

            <div className={popupStyles.content}>
                {/* {props.children} */}
                <div style = {{height: "5%", width: "95%", border: "1px solid black"}}>
                    <Button>change image/video</Button>
                </div>

                <div style = {{height: "10%", width: "95%", border: "1px solid black"}}>
                    <Row>
                        <Col xs={6}>
                            <div style = {{height: "100%", width: "100%", border: "1px solid black"}}>
                                <img className = {popupStyles.image} src={props.post.image} ></img>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicDescription">
                                        <Form.Label>
                                            {descInput}
                                        </Form.Label>
                                        <Form.Control as="textarea" onChange={handleDescInput}
                                        placeholder= "change to..."
                                        rows={3}/>
                                    </Form.Group>
                                </Form>
                            </div>
                        </Col>
                        <Col></Col>
                        <Col >
                            <Row> {commentsToast} </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
        </div>
    );
};

CustomPopup.propTypes = {
  title: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default CustomPopup;