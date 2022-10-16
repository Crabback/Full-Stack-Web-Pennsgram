import "../Styles.css";
import React from 'react';

export function Button(props) {
    return (
    <button className="btn"> {props.text} </button>);
  }
