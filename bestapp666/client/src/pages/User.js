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

      <div className="for-other-user">
        <button className="btn" onClick={addFollow}>
          {" "}
          {isFollowing ? "Following" : "Follow"}
        </button>
        <Row>
          <Col>
          <div>Following</div>
          </Col>
          <Col>
          <div>Followers</div>
          </Col>
        </Row>
        <Row>
          <Col>
          <div>User Name</div>
          </Col>
          <Col>
          <div>Some Description</div>
          </Col>
        </Row>

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
