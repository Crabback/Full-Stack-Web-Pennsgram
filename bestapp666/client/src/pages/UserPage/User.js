import "../../Styles.css";
import React, { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import ReactRoundedImage from "react-rounded-image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { NavLink, useParams} from "react-router-dom";
import {selectCurrentUser, updateCurrentUser} from './currentUserSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, followUser, unfollowUser} from "../../api/mock_api";
import ToggleButton from 'react-bootstrap/ToggleButton';

function CardCustomed(props){
    //props is a post fed from a following use
if (props.post.image.split(".").slice(-1) == 'mp4') {
  return(
    <Card bg = "light" style={{ width: '20rem'}}>
      <video width='290' controls autoPlay={true}>
        <source src={props.post.image} type="video/mp4"/>
      </video>          
      <Card.Body>
        <Card.Text>
          {props.post.description}
        </Card.Text>
      </Card.Body>
    </Card>
    )
}
else{
  return (
    <Card bg = "light" style={{ width: '20rem'}}>
      <Card.Img variant="bottom" rounded="true" src={props.post.image} />
      <Card.Body>
        <Card.Text>
          {props.post.description}
        </Card.Text>
      </Card.Body>
    </Card>
    )
}

}

export default function UserPage() {
    const dispatch = useDispatch();
    // the logged-in user who is browsing page (self)
    const stateCurrentUser = useSelector(selectCurrentUser);
  
    // the user we are browsing (other), default self
    const [thisUser, setThisUser] = useState(stateCurrentUser);
    
    const [offset, setOffset] = useState(0);
    const [checked, setChecked] = useState(true);
    const [text, setText] = useState("Follow");
    const [isFollowing, setIsFollowing] = useState(true);
    let { username } = useParams();

    useEffect(() => {
      async function fetchData() {
        //verification username exist or not
        let output = await getUser(username);
         //get the user object
        if(output[0] === undefined){
          alert("User Not Found.")
        }else{
          setThisUser(output[0]);
        }
      }
      try{fetchData();}
      catch(err){
        console.error(err);}

        if (stateCurrentUser.followings.includes(username)){
          setText("Following");
          setChecked(false);
          setOffset(0);
          setIsFollowing(true);
        }else{
          setText("Follow");
          setChecked(true);
          setOffset(0);
          setIsFollowing(false);
        }
    }, [username]); //adding dependency making sure useEffect only run once after each render

    const posts =  ( (thisUser.posts.length===0)?  [{"description": "This user has no post yet","image": ""}] : thisUser.posts).map((p) => (
      <CardCustomed post={p}/>
    ))

    function ActionButton(){
      // everything except the API call is visual only
      async function handleFollow(e) {
        setChecked(e.currentTarget.checked);
        if (text === "Follow"){
          setText("Following");
          if(isFollowing){
            setOffset(0);
          }else{
            setOffset(1);
          }
          const updatedUser = await followUser(stateCurrentUser.username, username);
          dispatch(updateCurrentUser(updatedUser));
          console.log(updatedUser);
          console.log(stateCurrentUser);
        }else{
          setText("Follow");
          if(isFollowing){
            setOffset(-1);
          }else{
            setOffset(0);
          }
          const updatedUser = await unfollowUser(stateCurrentUser.username, username);
          dispatch(updateCurrentUser(updatedUser));
        }
      }
      
      if (username === stateCurrentUser.username){
        return(
          <NavLink to="/upload"> 
            <Button>
              New Post
            </Button>
          </NavLink>
          )
      }else if(stateCurrentUser.username!=="NOT_A_USER"){
          return(
            <ToggleButton
            className="mb-2"
            id="toggle-check"
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            onChange={handleFollow}
            >
              {text}
            </ToggleButton>  
          )
      }
    }

    
  return (
    <div className='background'>
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <ReactRoundedImage
          image={thisUser.avatar}
          roundedColor="white"
          imageWidth="150"
          imageHeight="150"
          roundedSize="10"
          borderRadius="100"
        />
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: "1rem" }}>
        <p className="fw-bold" data-testid="username"> {thisUser.username} </p>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Row>
        <Col>
        <NavLink to={"/followinglist/"+thisUser.username} style={{ textDecoration: "none"}}> {thisUser.followings.length} Following </NavLink>
        </Col>
        <Col>
        <NavLink to={"/followerlist/"+thisUser.username} style={{ textDecoration: "none"}}> {thisUser.followers.length + offset} Followers </NavLink>
        </Col>
        </Row>
      </div>
      <Container>
          <Col sm={{span : 4, offset: 11}} style={{
            paddingBottom: '2rem', 
            paddingTop: '2rem'}}>
              <ActionButton />
          </Col>
          <Col sm={15}>
              <Row> {posts} </Row>
          </Col>
      </Container>
      
      <div style={{paddingLeft: "2rem"}}>
          <Footer />
      </div>

    </div>
  );
}
