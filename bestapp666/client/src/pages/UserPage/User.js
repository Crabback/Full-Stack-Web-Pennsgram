import "../../Styles.css";
import React, { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import { SearchBar } from "../../components/SearchBar";
import ReactRoundedImage from "react-rounded-image";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { NavLink, useParams} from "react-router-dom";
import {addLoginUser, logoutAction, selectCurrentUser} from './currentUserSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from "../../api/mock_api";



//define a inside components
function Card_customed(props){
    //props is a post fed from a following user

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


export default function UserPage() {

    // the logged-in user who is browsing page (self)
    const stateCurrentUser = useSelector(selectCurrentUser);
    
    // the user we are browsing (other), default self
    const [thisUser, setThisUser] = useState(stateCurrentUser);
    let { username } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);

    useEffect(() => {
      async function fetchData() {
        //verification username exist or not
        let output = await getUser(username);
         //get the user object
        if(output == undefined){
          alert("User Not Found.")
        }else{
          setThisUser(output[0]);}
      }

      try{fetchData();}
      catch(err){
          console.error(err);
      }
    }, [username]); //adding dependency making sure useEffect only run once after each render

    //follows
    const addFollow = () => {
      if (isFollowing) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }
    };

    var buttonContent = "";
    if (username==stateCurrentUser.username){
      buttonContent = "post"
    }else{
      buttonContent = "follow"
    }

    const posts =  thisUser.posts.map((p) => (
      <Card_customed post={p}/>
  ))

    const postNewPost =  (
      <NavLink to="/upload"> 
        <Button>
          {buttonContent}
        </Button>
      </NavLink>
    )


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
        <NavLink to={"/followerlist/"+thisUser.username} style={{ textDecoration: "none"}}> {thisUser.followers.length} Followers </NavLink>
        </Col>
        </Row>
      </div>
      <Container>
          <Col sm={{span : 4, offset: 11}} style={{
            paddingBottom: '2rem', 
            paddingTop: '2rem'}}>{postNewPost} </Col>
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
