import "../../Styles.css";
import React, { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import { SearchBar } from "../../components/SearchBar";
import MyPhoto from "../../images/user_pic1.png";
import ReactRoundedImage from "react-rounded-image";
import PlusSign from '../../images/plus-sign.png';
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

    let { username } = useParams();
    const [isFollowing, setIsFollowing] = useState(false);
    // declare and initialize the the user object for this page
    const stateCurrentUser = useSelector(selectCurrentUser);
    const [thisUser, setThisUser] = useState(stateCurrentUser);

    useEffect(() => {

      async function fetchData() {
        //verification username exist or not
        const userRoster = await getUser(username);
        //get the user object
        let user;
        userRoster.forEach(element => {user = element;});
        if(user == undefined){
          //login failed, due to wrong username cannot fetch data
          alert("User Not Found.")
        }else{
          setThisUser(user);
        }
      }

      try{
        fetchData();
      }
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
    <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
    <ReactRoundedImage
      image={thisUser.avatar}
      roundedColor="white"
      imageWidth="150"
      imageHeight="150"
      roundedSize="10"
      borderRadius="100"
    />
    </div>
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        paddingTop: "1rem"
      }}>
    <p className="fw-bold" data-testid="username"> {thisUser.username} </p>
    </div>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Row>
      <Col>
      <NavLink to="/followinglist" style={{ textDecoration: "none"}}> 100 Following </NavLink>
      </Col>
      <Col>
      <NavLink to="/followerlist" style={{ textDecoration: "none"}}> 88 Followers </NavLink>
      </Col>
      </Row>
    </div>
    <Container>
        <Col sm={{span : 4, offset: 11}} style={{
          paddingBottom: '2rem', 
          paddingTop: '2rem'}}>{postNewPost} </Col>
        <Col sm={15}>
            <Row>
                {posts}
            </Row>

        </Col>

    </Container>
    
    <div style={{paddingLeft: "2rem"}}>
        <Footer />
        </div>

    </div>
  );
}
