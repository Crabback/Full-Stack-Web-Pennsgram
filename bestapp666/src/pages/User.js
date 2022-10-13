import "../Styles.css";
import React from 'react';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Button} from "../components/Button";
import ReactSearchBox from "react-search-box";
import {
    IoMdAdd,
    IoMdSearch,
    IoIosNotifications,
    IoIosNotificationsOutline,
  } from "react-icons/io";


function UserPage() {
    return (
        <div className="top_half_page">
            <div className="right">
                <Header />
                <p>Brief About the platform</p>
            </div>
            <div className="logos">
                <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
                <h1>Pennsgram</h1>
            </div>
            <div className="right">
                <Button text="Start Your Journey"/>
            </div>
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white outline-none">
            <IoMdSearch fontSize={21} className="ml-1" />
                <input
                type="text"
                placeholder="Search"
                className="p-2 w-full outline-none placeholder:italic placeholder-gray-400 focus:placeholder-transparent"
                />
        </div>
        </div>
    )
}
export default UserPage
