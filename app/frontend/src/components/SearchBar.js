import "../Styles.css";
import React from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function SearchBar(){
  const navigate = useNavigate();
  const [input, setInput] = useState('');

  const handleSearch = (e) =>{
    e.preventDefault();
    navigate('/user/' + input);
    setInput('');
  }
    return (
      <Form className="d-flex" onSubmit={handleSearch} style={{paddingTop: "2rem", paddingRight:"20%"}}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          onChange={e => setInput(e.target.value) }
          value={input}
        />
      <Button type='submit'>Search</Button>
  </Form>
    );
  };