import React from "react";
import { Switch } from "react-router-dom"

import LoginForm from "./components/LoginForm"
import Register from "./components/Register"

import "./App.css"

function App() {
  return (
    <div className="App">
      <Switch>
        <Register path="/register" />
        <LoginForm path="/" />
      </Switch>
    </div>
  );
}

export default App;
