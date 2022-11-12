import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardCustomed} from '../../components/CardCustomed';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from "react-router-dom";
import { useSelector} from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';
import {selectCurrentUser} from '../UserPage/currentUserSlice'
import {getUsersAsList, getLastestPostOfAUser, getPost, getUser } from "../../api/mock_api";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


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
    <CardCustomed post={p} username={stateCurrentUser.username} setCommentState={setFeedPostOfUser} allDisplayedPosts={feedPostOfUser}/>
  ))

  let userlist =  stateCurrentUser.followerSuggestions.map((p) => (
    <ListGroup.Item as="li" >
      <NavLink to={"/user/"+p} className="button_text">
        {p}
      </NavLink>
    </ListGroup.Item>
  ))

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