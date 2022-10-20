import "../../Styles.css";
import React, { useState } from "react";
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
import { NavLink } from "react-router-dom";



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


export default function UserPage(props) {
    var buttonContent = "";
    if (props.who == "self"){
      buttonContent = "post"
    }else{
      buttonContent = "follow"
      
    }
    const [isFollowing, setIsFollowing] = useState(false);
    const [isSelf, setIsSelf] = useState(true);

    const addFollow = () => {
      if (isFollowing) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }
    };
    const feedPost1 = {author:"UserFollowing 1", 
    description:"Got an offer from Meta!",
    image: require("../../images/meta-post.png")
    };

    const feedPost2 = {author:"UserFollowing 2", 
    description:"Got an offer from MS!",
    image: require("../../images/ms-post.png")
    };

    const feedPost3 = {author:"UserFollowing 3", 
    description:"Got an offer from Amazon!",
    image: require("../../images/amaz-post.png")
    };

    const feedPost4 = {author:"UserFollowing 4", 
    description:"Got an offer from Apple!",
    image: require("../../images/apple-post.png")
    };

    const posts =  [feedPost1, feedPost2, feedPost3, feedPost4].map((post) => (
        <Card_customed post={post}/>
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
      image={require("../../images/noUserProfile.jpeg")}
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
    <p className="fw-bold" data-testid="username"> Username </p>
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
