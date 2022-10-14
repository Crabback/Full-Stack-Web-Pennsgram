import "../Styles.css";
import React, { useState } from "react";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SearchBar } from "../components/SearchBar";
import MyPhoto from "../images/user_pic1.png";
import ReactRoundedImage from "react-rounded-image";
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import PlusSign from '../images/plus-sign.png';
import Post from "../components/Post"
import Apple from "../images/apple-post.png"
import Amaz from "../images/amaz-post.png"
import Meta from "../images/meta-post.png"
import Ms from "../images/ms-post.png"

function UserPage(props) {
  const [isFollowing, setIsFollowing] = useState(false);

  const addFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
    } else {
      setIsFollowing(true);
    }
  };

  return (
    <div className="top_half_page">
      <div className="sticky-sm-top">
        <img
          src={require("../images/pennsgram_logo.png")}
          alt="logo"
          width="234"
          height="66"
        ></img>
      </div>
      <div className="right">
        <Header page="user" />
        <SearchBar />
        <ReactRoundedImage
          image={MyPhoto}
          roundedColor="#321124"
          imageWidth="100"
          imageHeight="100"
          roundedSize="2"
          borderRadius="100"
        />
      </div>
      <div className="for-other-user">
        <button className="btn" onClick={addFollow}>
          {" "}
          {isFollowing ? "Following" : "Follow"}
        </button>
        <div>User Name</div>
        <div>Some Description</div>
        <div>Following</div>
        <div>Followers</div>

      </div>
    <div className="bot_half_page">
        <div>
        <button className="btn">new post</button>
        </div>
        <div className="posts">
            <Post image={Apple} description="Got an offer from Apple! "/>
            <Post image={Amaz} description="Got an offer from Amazon!"/>
            <Post image={Ms} description="Got an offer from Microsoft!"/>
            <Post image={Meta} description="Got an offer from Meta!"/>

        </div>
    </div>
    </div>
  );
}
export default UserPage;
