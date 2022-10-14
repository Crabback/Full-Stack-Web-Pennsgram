import "../Styles.css";
import React from 'react';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Button} from "../components/Button";
import {SearchBar} from "../components/SearchBar";



const Post = props => (
    <div>
      <p>{props.description}</p>
      <img className="image" src={props.image} alt="icon" width="200" height="200"/>
    </div>
  );
  
  export default Post;
  