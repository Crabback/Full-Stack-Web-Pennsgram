import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {LikeButton} from '../../components/LikeButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactRoundedImage from "react-rounded-image";
import { NavLink } from "react-router-dom";
import { useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import ListGroup from 'react-bootstrap/ListGroup';


import {selectCurrentUser} from '../UserPage/currentUserSlice'
import { addComment, getUsersAsList, getLastestPostOfAUser, getPost, getUser } from "../../api/mock_api";
import { Nav } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//define a inside components
function CardCustomed(props){
  const navigate = useNavigate();
  const [descInput, setDescInput] = useState("");

  const handleLeaveComment= async (e) => {
    e.preventDefault();
    if(props.username === "NOT_A_USER"){
      alert("Please sign up/login to your account in order to make a post.");
      navigate("/");
    }else{
      const newComment = {
        "author": props.username,
        "comment": descInput,
      }
      await addComment(props.post.id, newComment);
    }
    setDescInput('');
  }

    if (props.post) {
      if(props.post.image.split(".").slice(-1) == 'mp4'){
        return (
          <Card bg = "light" style={{ width: '28rem'}}>
            <Navbar bg="dark" variant="dark">
              <Container>
                <Nav bg="dark" className="justify-content-end" activeKey="/">
                  <Nav.Item> <NavLink to={'/user/'+props.post.author}>
                      <ReactRoundedImage
                        image={props.post.avatar}
                        roundedColor="#ffffff" imageWidth="35" imageHeight="35" roundedSize="2" borderRadius="20"/>
                    </NavLink> </Nav.Item>
                  <Nav.Item> <NavLink to={'/user/'+props.post.author} className='headers'><strong>{props.post.author}</strong></NavLink> </Nav.Item>
                </Nav>
              </Container>
            </Navbar>
            <video width='446' controls autoPlay={true}> <source src={props.post.image} type="video/mp4"/> </video>  
            <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> 
              {props.post.date}
            </Card.Subtitle>
  
            <Card.Body>
              <Card.Text>{props.post.description} </Card.Text>
              
              <Row>
                <Col>
                  <Card.Text style={{paddingBottom: '1rem'}}> {props.post.likes.length} likes </Card.Text>
                </Col>
                <Col>
                  <Card.Text style={{paddingBottom: '1rem'}}> {props.post.comments.length} comments </Card.Text>
                </Col>
              </Row>

              <ButtonGroup aria-label="like,comment,message">
                  <LikeButton post = {props.post} username={props.username}/>
                  <Button className="mb-2" variant="outline-primary">Comment</Button>
              </ButtonGroup>

              <Form onSubmit={handleLeaveComment}>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Control as="textarea" onChange={e => setDescInput(e.target.value)}
                    placeholder="Leave a comment." 
                    rows={2}
                    value={descInput}/>
                  </Form.Group>
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
  
            <Card.Img variant="bottom" rounded="true" src={props.post.image} />
            <Card.Subtitle className="text-muted" style={{paddingTop: "1rem", paddingLeft:"1rem"}}> {props.post.date} </Card.Subtitle>
  
            <Card.Body>
              <Card.Text>{props.post.description} </Card.Text>
              
              <Row>
                <Col>
                  <Card.Text style={{paddingBottom: '1rem'}}> {props.post.likes.length} likes </Card.Text>
                </Col>
                <Col>
                  <Card.Text style={{paddingBottom: '1rem'}}> {props.post.comments.length} comments </Card.Text>
                </Col>
              </Row>

              <ButtonGroup aria-label="like,comment,message">
                  <LikeButton post = {props.post} username={props.username}/>
                  <Button className="mb-2" variant="outline-primary">Comment</Button>
              </ButtonGroup>

              <Form onSubmit={handleLeaveComment}>
                <Row>
                  <Form.Group className="mb-3" controlId="formBasicDescription">
                    <Form.Control as="textarea" onChange={e => setDescInput(e.target.value)}
                    placeholder="Leave a comment." 
                    rows={2}
                    value={descInput}/>
                  </Form.Group>
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



export default function FeedPage() {
  // get followings of the current user
    const stateCurrentUser = useSelector(selectCurrentUser);
    let followingsUsernames = stateCurrentUser.followings;
    const [feedPostOfUser, setFeedPostOfUser] = useState([]);
    const [popularPostsNearby, setPopularPostsNearby] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const userObjects = await getUsersAsList(followingsUsernames);
        
        //remove user who has no post
        const userObjectsFiltered = userObjects.filter((object)=>{
            return object.posts.length !==0;
          });

        // map the object to it's latest post
        const followingsLatestPost = await Promise.all(userObjectsFiltered.map(async (o) => {
          //return the largest(most recent) ID
          let postObject = await getLastestPostOfAUser(o.username);
          return postObject;
        }))
        setFeedPostOfUser(followingsLatestPost);

        // fetch popular post
        // get the popular post 
        const popularPosts = await Promise.all([1,10,3,12].map(async (id) => {
          const post = await getPost(id);
          const userResponse = await getUser(post.author);
          const author = userResponse[0];
          post.avatar = author.avatar;
          return post;
        }));
        setPopularPostsNearby(popularPosts);
      }
      try{
        fetchData();
      }
      catch(err){
          console.error(err);
      }
      
    }, []); //adding empty dependency making sure useEffect only run once after each render
  


  const cards = ((feedPostOfUser.length===0) ? popularPostsNearby:feedPostOfUser).map((p) => (
    <CardCustomed post={p} username={stateCurrentUser.username}/>
  ))

  let userlist =  stateCurrentUser.followerSuggestions.map((p) => (
    <ListGroup.Item as="li" >
      <NavLink to={"/user/"+p} className="button_text">
        {p}
      </NavLink>
    </ListGroup.Item>    ))

  return (
    <div className='background'>
    
    <Row>
      <Col style={{paddingLeft: "20%"}}>
        <Stack gap={2} className="col-md-6 mx-auto">
          {cards}
        </Stack>
      </Col>
      <Col style={{paddingLeft: "20%", paddingRight: "10%", paddingBottom: "2rem"}}>
        <h3 style={{paddingBottom: "2rem"}}> Recommended Users to Follow </h3>
        <ListGroup as="ul" defaultActiveKey="#link1">
        {userlist}
        </ListGroup>
      </Col>
    </Row>

    
    </div>
  );
}