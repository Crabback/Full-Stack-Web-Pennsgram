import "../Styles.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function SearchBar(){
  const navigate = useNavigate();

  var searchForUsername = 'self';
  const handleSearch = (e) =>{
    e.preventDefault();
    navigate('/user/false/' + searchForUsername);
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