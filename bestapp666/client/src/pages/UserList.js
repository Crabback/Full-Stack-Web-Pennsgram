import "../Styles.css";
import React, { useState } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import {Footer} from "../components/Footer";


function UserList(props){
    var header = ""
    if (props.list == "follower") {
     header = "Your followers";
    } else {
     header =  "You are following";
    }

    return(
    <div className="background">
    <h2 style={{paddingLeft: "2rem", paddingBottom: "1rem"}}> {header} </h2>
    <ListGroup as="ul" defaultActiveKey="#link1" style={{paddingLeft: "2rem", paddingRight: "70%", paddingBottom: "2rem"}}>
      <ListGroup.Item as="li" >
        Cras justo odio
      </ListGroup.Item>
      <ListGroup.Item as="li">
        Dapibus ac facilisis in
        </ListGroup.Item>
      <ListGroup.Item as="li" >
        Morbi leo risus
      </ListGroup.Item>
      <ListGroup.Item as="li">
        Porta ac consectetur ac
        </ListGroup.Item>
    </ListGroup>
    <NavLink to="/user" className="button_text"style={{paddingLeft: "2rem"}}>
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