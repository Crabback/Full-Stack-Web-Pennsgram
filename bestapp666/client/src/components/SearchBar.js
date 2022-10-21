import "../Styles.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { selectCurrentUser} from '../pages/UserPage/currentUserSlice'
import { useSelector } from 'react-redux'

export function SearchBar(){
  const navigate = useNavigate();
  const stateCurrentUser = useSelector(selectCurrentUser);

  var searchForUsername = stateCurrentUser.username;
  const handleSearch = (e) =>{
    e.preventDefault();
    navigate('/user/' + searchForUsername);
  }
    return (
      <Form className="d-flex" onSubmit={handleSearch} style={{paddingTop: "2rem", paddingRight:"20%"}}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={e => searchForUsername = e.target.value }
        />
      <Button type='submit'>Search</Button>
  </Form>
    );
  };