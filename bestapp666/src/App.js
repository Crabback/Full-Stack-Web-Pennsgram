import "./Styles.css";
import React from 'react';
import {Header} from "./components/Header";

export default function App() {
  return (
    <div className="App">
      <div className="top_half_page">
        <div className="right">
          <Header />
          <p>Brief About the platform</p>
        </div>
        <div className="logos">
          <img src="pennsgram_logo.jpeg" alt="logo"></img>
          <h1>Pennsgram</h1>
        </div>
        <div className="right">
          <button className="btn"> Start your journey </button>
        </div>
      </div>
      <div className="bot_half_page">
        <p>Some moments from our users</p>
        <div className="pics">
          <img src="pennsgram_logo.jpeg" alt="user pic 1"></img>
          <img src="pennsgram_logo.jpeg" alt="user pic 2"></img>
          <img src="pennsgram_logo.jpeg" alt="user pic 3"></img>
        </div>
        <div className="bottom">
          <p>Term And Policies All Copy Right Reserved</p>
        </div>
      </div>
    </div>
  );
}

