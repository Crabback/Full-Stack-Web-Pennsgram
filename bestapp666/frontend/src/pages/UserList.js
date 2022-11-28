import "../Styles.css";
import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { NavLink, useParams} from "react-router-dom";
import {Footer} from "../components/Footer";
import { useSelector } from 'react-redux'
import {selectCurrentUser} from './UserPage/currentUserSlice'
import { getUser } from "../api/mock_api";

function UserList(props){
    var header = "";

    // the logged-in user who is browsing page (self)
    const stateCurrentUser = useSelector(selectCurrentUser);

    // the user we are browsing (other), default self
    const [thisUser, setThisUser] = useState(stateCurrentUser);
    let { username } = useParams();

    useEffect(() => {
      async function fetchData() {
        //verification username exist or not
        let response = await getUser(username);
         //get the user object
        if(response === undefined){
          alert("User Not Found.")
        }else{
          setThisUser(response[0]);}
      }

      try{fetchData();}
      catch(err){
          console.error(err);
      }
    }, [username]); //adding dependency making sure useEffect only run once after each render

    let userlist;
    if (props.list === "follower") {
     header = "Followers";
      userlist =  thisUser.followers.map((p) => (
      <ListGroup.Item as="li" >
        <NavLink to={"/user/"+p} className="button_text">
          {p}
        </NavLink>
      </ListGroup.Item>
    ))
    } else {
    header =  "Following";
    userlist =  thisUser.followings.map((p) => (
      <ListGroup.Item as="li" >
        <NavLink to={"/user/"+p} className="button_text">
          {p}
        </NavLink>
      </ListGroup.Item>
    ))
    }

    
    return(
    <div className="background">
    <h2 style={{paddingLeft: "2rem", paddingBottom: "1rem"}}> {header} </h2>
    <ListGroup as="ul" defaultActiveKey="#link1" style={{paddingLeft: "2rem", paddingRight: "70%", paddingBottom: "2rem"}}>
      {userlist}
    </ListGroup>
    <NavLink to={"/user/"+thisUser.username} className="button_text" style={{paddingLeft: "2rem"}}>
        <Button variant="primary">
            Back
        </Button>
    </NavLink>
    <div style={{paddingLeft: "2rem", paddingTop: "1rem"}}>
        <Footer />
    </div>
    </div>
    )
}

export default UserList