import "./Styles.css";
import React from 'react';
import {Header} from "./components/Header";
import {Footer} from "./components/Footer";
import {Button} from "./components/Button";

export default function App() {
  return (
    <div className="App">
      <div className="top_half_page">
        <div className="right">
          <Header />
          <p>Brief About the platform</p>
        </div>
        <div className="logos">
          <img src={require("./images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
          <h1>Pennsgram</h1>
        </div>
        <div className="right">
          <Button text="Start Your Journey"/>
        </div>
      </div>
      <div className="bot_half_page">
        <p>Some moments from our users</p>
        <div className="pics">
          <img src={require("./images/user_pic1.png")} alt="user pic 1" width="132" height="132"></img>
          <img src={require("./images/user_pic1.png")} alt="user pic 1" width="132" height="132"></img>
          <img src={require("./images/user_pic1.png")} alt="user pic 1" width="132" height="132"></img>
        </div>
        <div className="bottom">
          <Footer />
        </div>
      </div>
    </div>
  );
}

