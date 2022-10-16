import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card';
import Stack from 'react-bootstrap/Stack';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//define a inside components
function Card_customed(props){
    //props is a post fed from a following user

    return (
        
        <Card bg = "light" style={{ width: '28rem'}}>
          <Card.Title>
            {props.post.author}
            </Card.Title>
          <Card.Img variant="bottom" rounded="true" src={props.post.image} />
          <Card.Body>
            <Card.Text>
              {props.post.description}
            </Card.Text>
            <ButtonGroup aria-label="like,comment,message">
                <Button variant="light">Like</Button>
                <Button variant="light">Comment</Button>
                <Button variant="light">Message</Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
        )
}




export default function FeedPage() {
    const feedPost1 = {author:"UserFollowing 1", 
    description:"Some description about the tiger.",
    image: tigerUrl
    };

    const feedPost2 = {author:"UserFollowing 2", 
    description:"Some description about the cat.",
    image: catUrl
    };

    const feedPost3 = {author:"UserFollowing 3", 
    description:"Some description about the dog.",
    image: dogUrl
    };

    const feedPost4 = {author:"UserFollowing 4", 
    description:"Some description about the pig.",
    image: pigUrl
    };

  return (
    <div className='home'>
    
    <Stack gap={2} className="col-md-6 mx-auto">
        
        {[feedPost1, feedPost2, feedPost3, feedPost4].map((post) => (
        <Card_customed post={post}/>
    ))}
    </Stack>
    
    </div>
  );
}

//images source
var pigUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSArC7oN3AWH3h8qHv5PYNoOrnKXdBMPph9JQ&usqp=CAU";
var dogUrl = "https://i.pinimg.com/736x/36/cd/ab/36cdabd55c158426997719b6f2fe00ad.jpg";
var catUrl = "https://bestfriends.org/sites/default/files/styles/five_col_rect_960x960_/public/feature-card/SampsonJessicaJess9655_square.jpg?itok=SE0pg8sC";
var tigerUrl = "https://i2-prod.dailyrecord.co.uk/incoming/article2299090.ece/ALTERNATES/s1200d/The-family-pose-for-a-picture-in-their-living-room-with-Tom-the-tiger.jpg";
