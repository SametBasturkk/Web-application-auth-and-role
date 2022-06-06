import React from "react";
import { Redirect } from "react-router-dom";

const withAuth = (Component) => {
  const AuthRoute = () => {
    const isAuth = !!localStorage.getItem("token");
    if (isAuth) {
      return <Component />;
    } else {
      alert("You are not logged in!");
      return <Redirect to="/" />;
    }
  };

  return AuthRoute;
};

export default withAuth;
