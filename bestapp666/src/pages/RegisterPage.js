import "../Styles.css";
import React from 'react';
import {Header} from "../components/Header";
import {Footer} from "../components/Footer";
import {Button} from "../components/Button";
import {Form} from "../components/Form";

function RegisterPage() {
    return (
    <div className='register'>
        <Header page="home"/>
        <img src={require("../images/pennsgram_logo.png")} alt="logo" width="234" height="66"></img>
        <div className="split left">
            <div className="centered">
                <Form />
                <Button text="Become a User Now"/>
            </div>
        </div>

        <div className="split right">
            <div className="centered">
                <img src={require("../images/user_pic1.png")} alt="user pic 1" width="200" height="200"></img>
                <Button text="Upload"/>
            </div>
        </div>
        <Footer />
    </div>
    );
}

export default RegisterPage