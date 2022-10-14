import "../Styles.css";
import React from 'react';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Button} from "../components/Button";
import {SearchBar} from "../components/SearchBar";

function BrowsePage() {
    return (
    <div className="home">
      <div className="top_half_page">
        <div className="right">
          <Header page="user"/>
          <SearchBar />
        </div>
        <div className="logos">
          <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
        </div>
      </div>
      <div className="bot_half_page">
        <form>
        <label>
        <img src={require("../images/user_pic1.png")} alt="user pic 1" width="200" height="200"></img>
            </label>
            <label>
            <img src={require("../images/user_pic1.png")} alt="user pic 2" width="200" height="200"></img>
            </label>
            <label>
            <img src={require("../images/user_pic1.png")} alt="user pic 3" width="200" height="200"></img>
            </label>
        </form>
        <div className="bottom">
          <Footer />
        </div>
      </div>
    </div>)
  }
export default BrowsePage