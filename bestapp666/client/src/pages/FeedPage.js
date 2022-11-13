import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {CardFeedPage} from '../components/CardFeedPage';
import Stack from 'react-bootstrap/Stack';
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import ListGroup from 'react-bootstrap/ListGroup';
import {selectCurrentUser} from './UserPage/currentUserSlice'
import {getUsersAsList, getLastestPostOfAUser, getPost, getUser } from "../api/mock_api";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function FeedPage() {
  const dispatch = useDispatch();
// get followings of the current user
  const stateCurrentUser = useSelector(selectCurrentUser);
  let followingsUsernames = stateCurrentUser.followings;
  const [feedPostOfUser, setFeedPostOfUser] = useState([]);
  const [popularPostsNearby, setPopularPostsNearby] = useState([
    {
      "id": 29,
      "author": "elon",
      "description": "I have officially dubbed myself \"Chief Twit\"",
      "date": "10/1/2022",
      "image": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/elon-musk-twitter-0405221.jpg",
      "likes": [
        "ayesha"
      ],
      "comments": [
        {
          "author": "ayesha",
          "comment": "ayesha leaving comment. Good luck with your buy.",
          "mention": "@curry"
        }
      ]
    },
    {
      "id": 30,
      "author": "elon",
      "description": "The time I was in Upenn!!!\nAs reported:\"A romance of sorts blossomed - although, she griped, it was lacking in PDA. They were in their twenties, and she was attracted by his shy nature; he by her cascades of curly blonde hair. She was just his type. They went out for a year and, until he ran off to Palo Alto, where he attended Stanford University for two days before dropping out to shoot for the stars.\"",
      "date": "10/1/2022",
      "image": "https://media.tatler.com/photos/6306413b572b596a06f35dc2/master/w_1600,c_limit/ElonMusk_240822_3461923_1.jpg",
      "likes": [
        "ayesha"
      ],
      "comments": []
    }
  ]);
  const [editedAndRefreshCards, setEditedAndRefreshCards] = useState(true); //the value of this switch doesn't matter only the change matter for triggering useEffect
  const [hearFromDeleteComment, setHearFromDeleteComment] = useState(false); //the request for refreshing comment list from PopUp window, trigger value doesnt matter
  const [visibility, setVisibility] = useState(false);
  const [postBeingEdited, setPostBeingEdited] = useState({});
  
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
      }
      try{
        fetchData();
      }
      catch(err){
          console.error(err);
      }
    }, [editedAndRefreshCards, hearFromDeleteComment]); //adding empty dependency making sure useEffect only run once after each render
  


  const cards = ((feedPostOfUser.length===0) ? popularPostsNearby:feedPostOfUser).map((p) => (
    <CardFeedPage post={p} username={stateCurrentUser.username} setCommentState={setFeedPostOfUser} allDisplayedPosts={feedPostOfUser}
    setEditedAndRefreshCards = {setEditedAndRefreshCards} oldEditedAndRefreshCards={editedAndRefreshCards} 
    setPostBeingEdited = {setPostBeingEdited} setVisibility= {setVisibility}/>
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

      <Col style={{paddingLeft: "10%"}}>
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