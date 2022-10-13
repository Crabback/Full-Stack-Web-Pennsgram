import "../Styles.css";
import React from 'react';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Button} from "../components/Button";
import {
    IoMdAdd,
    IoMdSearch,
    IoIosNotifications,
    IoIosNotificationsOutline,
  } from "react-icons/io";


function UserPage() {
    return (
        <div className="top_half_page">
            <div className="sticky-md-top">
                <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
            </div>
            <div className="right">
                <div className="sticky-top">
                <Header page="user"/>
                <IoMdSearch fontSize={21} className="ml-1" />
                    <input
                    type="text"
                    placeholder="Search"
                    className="p-2 w-full outline-none placeholder:italic placeholder-gray-400 focus:placeholder-transparent"
                />
                </div>

            </div>
            <div className="middle">
                <Button ></Button>
            </div>
        </div>
        
    )
}
export default UserPage
