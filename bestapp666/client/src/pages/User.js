import "../Styles.css";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import MyPhoto from "../images/user_pic1.png";
import ReactRoundedImage from "react-rounded-image";
import PlusSign from '../images/plus-sign.png';
import Post from "../components/Post"
import Apple from "../images/apple-post.png"
import Amaz from "../images/amaz-post.png"
import Meta from "../images/meta-post.png"
import Ms from "../images/ms-post.png"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { PropaneSharp } from "@mui/icons-material";


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

    const [isFollowing, setIsFollowing] = useState(false);

    const addFollow = () => {
      if (isFollowing) {
        setIsFollowing(false);
      } else {
        setIsFollowing(true);
      }
    };
    const feedPost1 = {author:"UserFollowing 1", 
    description:"Got an offer from Meta!",
    image: Meta
    };

    const feedPost2 = {author:"UserFollowing 2", 
    description:"Got an offer from MS!",
    image: Ms
    };

    const feedPost3 = {author:"UserFollowing 3", 
    description:"Got an offer from Amazon!",
    image: Amaz
    };

    const feedPost4 = {author:"UserFollowing 4", 
    description:"Got an offer from Apple!",
    image: Apple
    };

    const posts =  [feedPost1, feedPost2, feedPost3, feedPost4].map((post) => (
        <Card_customed post={post}/>
    ))

        const postNewPost =  (
            <Button>
            <Nav.Link href="/upload">New Post</Nav.Link>
            </Button>
        )


  return (
      
    <div className='home'>
    
    <Container>
        <Col sm={{span : 4, offset: 11}}>{postNewPost} </Col>

        <Col sm={15}>
            <Row>
                {posts}
            </Row>

        </Col>

    </Container>
    
    

    </div>
  );
}
