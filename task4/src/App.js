import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './style.css';


import Navbar from "./components/Navbar";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";



function App() {
  return (
    <BrowserRouter>
    
      <Navbar />
      <div className="container mt-2" style={{ marginTop: 40 }}>
        <Switch>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route path="/Dashboard/:name">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
