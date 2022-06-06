import React from "react";
import { Alert } from "react-bootstrap";

const isAuth = !!localStorage.getItem("token");

const Welcome = () => (
  <div>
    <h1 className="title is-1">This is the Home Page</h1>

    {!isAuth ? (
      <Alert variant="danger">
        <Alert.Heading>You are not logged in!</Alert.Heading>
        <p>Please login for take a look at the Dashboard page.</p>
      </Alert>
    ) : (
      <Alert variant="success">
        <Alert.Heading>You are logged in!</Alert.Heading>
      </Alert>
    )}
  </div>
);

export default Welcome;
