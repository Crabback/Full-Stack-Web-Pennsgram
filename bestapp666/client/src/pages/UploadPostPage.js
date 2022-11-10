import "../Styles.css";
import React, { useState } from 'react';
import {Footer} from "../components/Footer";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {updateCurrentUser, selectCurrentUser} from './UserPage/currentUserSlice'
import { useSelector, useDispatch } from 'react-redux'
import { createNewPost } from "./../api/mock_api";

function UploadPostPage() {
  const navigate = useNavigate();
  const [media, setMedia] = useState('https://drive.google.com/uc?export=view&id=1F2X0d6KkJWV26qoofFx6u9YGeUnCSfcl');
  const stateCurrentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  const handleImageURLInput = (e) => {
    if (e.target.name === "imageURL") {
      setMedia((state) => (e.target.value));
    }}

  function handleChange(e) {
    setMedia(URL.createObjectURL(e.target.files[0]));
  }

  function addDefaultImgSrc(ev){
    ev.target.src = "https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg";
    setMedia("https://st4.depositphotos.com/14953852/24787/v/600/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg");
  }
  //handle the temporary inputs in the post description 
  const [descInput, setDescInput] = useState("");

  const handleDescInput = (e) =>{
    setDescInput( e.target.value);
  };

  //we only get 3 arguments of a post: 
  const handlePostUpload = async (e) => {
    e.preventDefault();

    if(stateCurrentUser.username === "NOT_A_USER"){
      alert("Please sign up/login to your account in order to make a post.");
      navigate("/");
    }else{
      //create a new post object
      const newPost = {
        "id": -1,
        "author": stateCurrentUser.username,
        "description": descInput,
        "image": media,
        "likes": [],
        "comments": []
      }
      const prePosts = stateCurrentUser.posts;
      //update the id field
      const ids = (prePosts.length===0) ? [0,-1] : (prePosts.map(object => {
        return object.id;
      }));
      const maxID = Math.max(...ids);
      let newID = maxID + 1;
      newPost.id = newID;

      //call api
      const updatedUser = await createNewPost(stateCurrentUser.username, newPost);
      //dispatch the updated user;
      dispatch(updateCurrentUser(updatedUser));
      console.log("upload completed");
      navigate("/user/" + stateCurrentUser.username);
    }
    
  }

function MediaPreview(props){
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
  
}

return (
<div className="background">
  <Row>
  <Col ></Col>

  <Form onSubmit={handlePostUpload}>
    <Row>
  <Col >
      <MediaPreview mediaLink = {media}/>
      <Form.Group controlId="formFile" className="mb-3" style={{paddingRight: "30%"}}>
        <Form.Label>Upload Media</Form.Label>
        <Form.Control type="file" onChange={handleChange}/>
        <Form.Control name="imageURL" onChange={handleImageURLInput} placeholder="Enter online image url" />
      </Form.Group>
  </Col>

  <Col>
    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control as="textarea" onChange={handleDescInput}
      placeholder="Description about the picture/video." 
      rows={3}/>
    </Form.Group>

    <Button variant="primary" type="submit">
      Upload
    </Button>

  </Col>
  </Row>
  </Form>
  <Col sm={1}></Col>
  </Row>
  <div style={{paddingLeft: "2rem", paddingTop: "5rem"}}>
    <Footer />
  </div>
</div>)
}
export default UploadPostPage