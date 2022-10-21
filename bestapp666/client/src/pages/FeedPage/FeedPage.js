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
import { getUsersAsList } from "../../api/mock_api";
import { Nav } from 'react-bootstrap';

//define a inside components
function CardCustomed(props){
    //props is a post fed from a following user
    return (
        <Card bg = "light" style={{ width: '28rem'}}>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Nav bg="dark" className="justify-content-end" activeKey="/">
                <Nav.Item>
                  <NavLink to={'/user/'+props.post.author}>
                    <ReactRoundedImage
                      image={props.post.avatar}
                      roundedColor="#ffffff"
                      imageWidth="35"
                      imageHeight="35"
                      roundedSize="2"
                      borderRadius="20"
                    />
                  </NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink to={'/user/'+props.post.author} className='headers'><strong>{props.post.author}</strong></NavLink>
                </Nav.Item>
              </Nav>
            </Container>
          </Navbar>

          <Card.Img variant="bottom" rounded="true" src={props.post.image} />
          <Card.Subtitle className="text-muted" style={{paddingTop: "1rem"}}> 
            {props.post.date}
          </Card.Subtitle>

          <Card.Body>
            <Card.Text>
              {props.post.description}
            </Card.Text>
            <ButtonGroup aria-label="like,comment,message">
                <Button variant="light">Like</Button>
                <Button variant="light">Comment</Button>
            </ButtonGroup>
          </Card.Body>

        </Card>
        )
}



export default function FeedPage() {
  // get followings of the current user
    const stateCurrentUser = useSelector(selectCurrentUser);
    let followingsUsernames = stateCurrentUser.followings;
    const [followingsObjects, setFollowings] = useState([]);

    useEffect(() => {
      async function fetchData() {
        const userObjects = await getUsersAsList(followingsUsernames);
        //remove user who has no post
        const userObjectsFiltered = userObjects.filter((object)=>{
            return object.posts.length !==0;
          });
    
        console.log(userObjectsFiltered);
        setFollowings(userObjectsFiltered);
      }
      try{
        fetchData();
      }
      catch(err){
          console.error(err);
      }
      
    }, []); //adding empty dependency making sure useEffect only run once after each render

    const feedPost1 = {author:"UserFollowing 1", 
    description:"Some description about the tiger.",
    date: "10/22/2022",
    image: tigerUrl
    };

    const feedPost2 = {author:"UserFollowing 2", 
    description:"Some description about the cat.",
    date: "10/18/2022",
    image: catUrl
    };

    const feedPost3 = {author:"UserFollowing 3", 
    description:"Some description about the dog.",
    date: "10/16/2022",
    image: dogUrl
    };

    const feedPost4 = {author:"UserFollowing 4", 
    description:"Some description about the pig.",
    date: "10/12/2022",
    image: pigUrl
    };
  
  const followingsLatestPost = followingsObjects.map((o)=>{
    //return the largest(most recent) ID
    const postObject = o.posts.sort(function(a, b){return b.id - a.id})[0];
    //adding one more avatar field for this post
    postObject.avatar = o.avatar;
    return postObject;
  })

  const card = ((followingsObjects.length===0) ?[feedPost1, feedPost2,feedPost3,feedPost4]:followingsLatestPost).map((p) => (
    <CardCustomed post={p}/>
  ))

  return (
    <div className='background'>
    
    <Stack gap={2} className="col-md-6 mx-auto">
        
        {card}
    </Stack>
    
    </div>
  );
}

//images source
var pigUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArC7oN3AWH3h8qHv5PYNoOrnKXdBMPph9JQ&usqp=CAU";
var dogUrl = "https://i.pinimg.com/736x/36/cd/ab/36cdabd55c158426997719b6f2fe00ad.jpg";
var catUrl = "https://bestfriends.org/sites/default/files/styles/five_col_rect_960x960_/public/feature-card/SampsonJessicaJess9655_square.jpg?itok=SE0pg8sC";
var tigerUrl = "https://i2-prod.dailyrecord.co.uk/incoming/article2299090.ece/ALTERNATES/s1200d/The-family-pose-for-a-picture-in-their-living-room-with-Tom-the-tiger.jpg";
