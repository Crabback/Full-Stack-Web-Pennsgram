import "../Styles.css";
import React, { Component } from 'react';
import ReactRoundedImage from "react-rounded-image";
import MyPhoto from "../images/user_pic1.png";

export function Header(props) {
    if (props.page=="home") {
    return (
        <div className="header" >
            <div className="header_elements">Home</div>
            <div className="header_elements">About</div>
            <div className="header_elements">Contact Us</div>
            <div className="header_elements">Login</div>
            <div className="header_elements">Sign up</div>
        </div>);
    } else if (props.page=="user"){
        return (
            <div className="header" >
                <div className="header_elements">Home</div>
                <div className="header_elements">About</div>
                <div className="header_elements">Contact Us</div>
                <div className="header_elements"> </div>
                <ReactRoundedImage
                image={MyPhoto}
                roundedColor="#321124"
                imageWidth="18"
                imageHeight="18"
                roundedSize="2"
                borderRadius="10"
                />
                <div className="header_elements">Username</div>
            </div>);
    }
  }
