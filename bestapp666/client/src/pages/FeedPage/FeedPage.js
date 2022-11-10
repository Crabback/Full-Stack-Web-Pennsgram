import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import ReactRoundedImage from "react-rounded-image";
import { NavLink } from "react-router-dom";
import { useSelector} from 'react-redux'
import {selectCurrentUser} from '../UserPage/currentUserSlice'
import { getUsersAsList, getLastestPostOfAUser, getPost } from "../../api/mock_api";
import { Nav } from 'react-bootstrap';

//define a inside components
function CardCustomed(props){
    //props is a post fed from a following user
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
            <Card.Subtitle className="text-muted" style={{paddingTop: "1rem"}}> 
              {props.post.date}
            </Card.Subtitle>
  
            <Card.Body>
              <Card.Text> {props.post.description} </Card.Text>
              <ButtonGroup aria-label="like,comment,message">
                  <Button variant="light">Like</Button>
                  <Button variant="light">Comment</Button>
              </ButtonGroup>
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
            <Card.Subtitle className="text-muted" style={{paddingTop: "1rem"}}> {props.post.date} </Card.Subtitle>
  
            <Card.Body>
              <Card.Text>{props.post.description} </Card.Text>
              <ButtonGroup aria-label="like,comment,message">
                  <Button variant="light">Like</Button>
                  <Button variant="light">Comment</Button>
              </ButtonGroup>
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
          //adding one more avatar field for this post
          postObject.avatar = o.avatar;
          return postObject;
        }))
        setFeedPostOfUser(followingsLatestPost);

        // fetch popular post
        // get the popular post 
        const popularPosts = await Promise.all([1,2,3].map(async (id) => {
          const post = await getPost(id);
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
    <CardCustomed post={p}/>
  ))

  return (
    <div className='background'>
    
    <Stack gap={2} className="col-md-6 mx-auto">
        {cards}
    </Stack>
    
    </div>
  );
}