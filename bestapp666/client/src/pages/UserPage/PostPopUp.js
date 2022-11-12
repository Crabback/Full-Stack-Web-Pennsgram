import React from "react";
import popupStyles from "./post-popup.module.css";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {deletePost, getComments, deleteComment, updatePost} from "../../api/mock_api";
import { NavLink } from "react-router-dom";

const CustomPopup = (props) => {

    const [show, setShow] = useState(false);
    const [media, setMedia] = useState("");
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
        setDescInput(props.post.description);
        console.log("current post: ", props.post);
        }, [props.show]);
        
    const handleDescInput = (e) =>{
        setDescInput( e.target.value);
    };
    
    async function handleDeleteComment(postId, content){
        console.log(postId, content);
        await deleteComment(postId, content);
        alert("Delete Successful! Please re-enter this page to see the change.")
    };

    async function handleDeletePost(postId){
        await deletePost(postId);
        alert("Delete Successful! Please re-enter this page to see the change.")
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        await updatePost(props.post.id, media, descInput);
        alert("Update Successful! Please re-enter this page to see the change.")
    };

    function addDefaultImgSrc(ev){
        ev.target.src = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
        setMedia("https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg");
      }
      
    const handleImageURLInput = (e) => {
          setMedia(e.target.value);
        }

    function MediaPreview(props){
        if (props.mediaLink){
            if (props.mediaLink.split(".").slice(-1) == 'mp4'){
                return (
                <Form.Group className="mb-3">
                <video width="500" controls >
                    <source src={props.mediaLink} type="video/mp4"/>
                </video>
                </Form.Group>
                ) 
            }else{
                return (
                <Form.Group className="mb-3">
                    <img onError={addDefaultImgSrc} src={props.mediaLink} alt="user pic 1" width="400" height="400"></img>
                </Form.Group>
                )
            }
        }else{
            return (
                <Form.Group className="mb-3">
                    <img onError={addDefaultImgSrc} src={media} alt="user pic 1" width="400" height="400"></img>
                </Form.Group>
                )
        }
    }

    const commentsToast = (props.post.comments?  props.post.comments : [{author: "Void",
                                                    comment: "No comments",
                                                    mention: "@[NOT_A_USER](NOT_A_USER)"}]
    ).map((p, idx) => {
        return (
        <Toast onClose={(e) => handleDeleteComment(props.post.id, p.comment)} delay={1000}  className="d-inline-block m-1" bg={"light"} key={idx}>
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
            <Button variant="outline-danger" onClick = {(e)=> handleDeletePost(props.post.id)}>Delete Post</Button>

            <span className={popupStyles.close} onClick={closeHandler}>
            &times;
            </span>

            <div className={popupStyles.content}>
                {/* {props.children} */}

                <div style = {{height: "10%", width: "95%"}}>
                    <Row>
                        <Col xs={6}>
                            <div style = {{height: "100%", width: "100%"}}>
                                <Form onSubmit={handleUpdate}>
                                    <MediaPreview mediaLink = {props.post.image}/>
                                    <Form.Group className="mb-3" controlId="formBasicDescription">
                                        <Form.Label>
                                            {descInput}
                                        </Form.Label>
                                        <Form.Control name="imageURL" onChange={handleImageURLInput} placeholder="Enter online image url" />
                                        <Form.Control as="textarea" onChange={handleDescInput}
                                        placeholder= "Change the text to..."
                                        rows={3}/>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        change image/video
                                    </Button>
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