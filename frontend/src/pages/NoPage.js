import React from 'react';
import Alert from 'react-bootstrap/Alert';

function NoPage(){
    return (
    <Alert id="noPageID" variant="danger" >
      <Alert.Heading>404. Page Not Found. </Alert.Heading>
      <p>
        Change this and that and try again. 
      </p>
  </Alert>)
  };
  
  export default NoPage;