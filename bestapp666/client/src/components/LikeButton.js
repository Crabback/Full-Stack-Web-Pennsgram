import "../Styles.css";
import React, { useState, useEffect } from 'react';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {unlikePost, likePost } from "../api/mock_api";


export function LikeButton(props) {
    const liked = props.post.likes.includes(props.username);
    const [checked, setChecked] = useState(props.post.likes.includes(props.username));
    const [text, setText] = useState(() => {
        if (checked) {
            return "Liked";
        }else{
            return "Like"
        }
      });

    async function handleLike(e) {
        setChecked(e.currentTarget.checked);
        if (text === "Like"){
          setText("Liked");
          if (liked){
            props.setOffset(0);
          }else{
            props.setOffset(1);
          }
          await likePost(props.username, props.post.id);
        }else{
          setText("Like");
          if (liked){
            props.setOffset(-1);
          }else{
            props.setOffset(0);
          }
          await unlikePost(props.username, props.post.id);
        }
      }

    if(props.username !== "NOT_A_USER"){
        return (
            <ToggleButton
            className="mb-2"
            id= {props.post.id}
            type="checkbox"
            variant="outline-primary"
            checked={checked}
            onChange={handleLike}>
              {text}
            </ToggleButton>  
            );
    }
  }
