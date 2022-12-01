import "../../Styles.css";
import { getPost } from "../../api/mock_api";
import React, { useState, useEffect } from "react";
import { Footer } from "../../components/Footer";
import ReactRoundedImage from "react-rounded-image";
import {CardCustomedUserPage} from '../../components/CardUserPage';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { NavLink, useParams} from "react-router-dom";
import {selectCurrentUser, updateCurrentUser} from './currentUserSlice'
import { useSelector, useDispatch } from 'react-redux'
import { getUser, getPosts, followUser, unfollowUser} from "../../fetcher";
import ToggleButton from 'react-bootstrap/ToggleButton';
import PostPopUp from './PostPopUp.js'

export default function User() {
    
    const dispatch = useDispatch();
    // the logged-in user who is browsing page (self)
    const stateCurrentUser = useSelector(selectCurrentUser);
    const [thisUser, setThisUser] = useState(stateCurrentUser);
    const [allPosts, setThisUserPosts] = useState([]);
    const [offset, setOffset] = useState(0);
    const [checked, setChecked] = useState(true);
    const [text, setText] = useState("Follow");
    const [isFollowing, setIsFollowing] = useState(true);
    let { username } = useParams();
    // action trigger states
    const [editedAndRefreshCards, setEditedAndRefreshCards] = useState(true); //the value of this switch doesn't matter only the change matter for triggering useEffect
    const [hearFromDeleteComment, setHearFromDeleteComment] = useState(false); //the request for refreshing comment list from PopUp window, trigger value doesnt matter
    // states for post edit pop up
    const [visibility, setVisibility] = useState(false);
    const [postBeingEdited, setPostBeingEdited] = useState({});

    useEffect(() => {
      async function fetchData() {
        //verification username exist or not
        let output1 = await getUser(username);
        let output2 = await getPosts();
         //get the user object
        if(output1[0] === undefined){
          alert("User Not Found.")
        }else{
          setThisUser(output1[0]);
          setThisUserPosts(output2); //这里不科学set this user posts 为所有的post
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

      // if hearFromDeleteComment: action -> setPostBeingEdited
      async function updatePostBeingEdited(){
          //refresh the same post with comment deleted
            console.log("before postBeingEdited.id", postBeingEdited.id);
            const updatedPost = await getPost(JSON.stringify(postBeingEdited)!== '{}'? postBeingEdited.id : -1);
            setPostBeingEdited(updatedPost);
            console.log("after postBeingEdited.id", postBeingEdited.id);

      }
      try{
        if(JSON.stringify(postBeingEdited)!== '{}' && postBeingEdited) {updatePostBeingEdited()};
      }catch(err){
        console.log(err);
        console.log("Error: User: useEffect: updatePostBeingEdited");
      }

    }, [username, editedAndRefreshCards, hearFromDeleteComment]); //adding dependency making sure useEffect only run once after each render


    const popupCloseHandler = () => {
      setVisibility(false);
    };

    const posts = ((thisUser.posts.length===0)?  [-1] : thisUser.posts).map((p)=>(
      <CardCustomedUserPage username={stateCurrentUser.username} post={allPosts.filter(n => n.id === p)[0]} 
                            setEditedAndRefreshCards = {setEditedAndRefreshCards} oldEditedAndRefreshCards={editedAndRefreshCards} 
                            setPostBeingEdited = {setPostBeingEdited} setVisibility= {setVisibility} />
    ))

    function ActionButton(){
      // everything except the API call is visual only
      async function handleFollow(e) {
        setChecked(e.currentTarget.checked);
        if (text === "Follow"){
          setText("Following");
          if(isFollowing){setOffset(0);}
          else{setOffset(1);}
          const updatedUser = await followUser(stateCurrentUser.username, username);
          dispatch(updateCurrentUser(updatedUser));
        }else{
          setText("Follow");
          if(isFollowing){setOffset(-1);}
          else{setOffset(0);}
          const updatedUser = await unfollowUser(stateCurrentUser.username, username);
          dispatch(updateCurrentUser(updatedUser));
        }
      }
      
      if (username === stateCurrentUser.username){
        return(
          <NavLink to="/upload"> 
            <Button> New Post </Button>
          </NavLink>
          )
      }else if(stateCurrentUser.username!=="NOT_A_USER"){
          return(
            <ToggleButton className="mb-2" id="toggle-check" type="checkbox" variant="outline-primary"
            data-testid="followingButton" checked={checked} onChange={handleFollow}>
              {text}
            </ToggleButton>  
          )
      }else{
        return (
          <NavLink to="/login"> 
            <Button> Login to Follow </Button>
          </NavLink>
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
          borderRadius="100"/>
      </div>
      <div style={{display: 'flex', justifyContent: 'center', paddingTop: "1rem" }}>
        <p className="fw-bold" data-testid="username"> {thisUser.username} </p>
      </div>
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Row>
          <Col> <NavLink to={"/followinglist/"+thisUser.username} style={{ textDecoration: "none"}}> {thisUser.followings.length} Following </NavLink> </Col>
          <Col> <NavLink to={"/followerlist/"+thisUser.username} style={{ textDecoration: "none"}}> {thisUser.followers.length + offset} Followers </NavLink> </Col>
        </Row>
      </div>

      <Container>
          <Col sm={{span : 4, offset: 11}} style={{paddingBottom: '2rem', paddingTop: '2rem'}}>
            <ActionButton />
          </Col>
          <Col sm={15}>
            <Row> {posts} </Row>
          </Col>
      </Container>
      
      <PostPopUp className = "popWindow" post = {postBeingEdited} 
                 setEditedAndRefreshCards = {setEditedAndRefreshCards} oldEditedAndRefreshCards={editedAndRefreshCards} 
                 setHearFromDeleteComment = {setHearFromDeleteComment} oldHearFromDeleteComment={hearFromDeleteComment}
                 setPostBeingEdited = {setPostBeingEdited}
                 onClose={popupCloseHandler} show={visibility}>

          <h1>Hello This is Popup Content Area</h1>
          <h2>This is my lorem ipsum text here!</h2>
      </PostPopUp>


      <div style={{paddingLeft: "2rem"}}>
          <Footer />
      </div>
    </div>
  );
}
