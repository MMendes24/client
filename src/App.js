import React from "react";
import { Switch, Route } from "react-router-dom"


// import app components 
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Dashboard from "./components/Dashboard"

// import campaign components 
import CampaignInfo from "./components/CampaignInfo"
import CampaignAdd from "./components/CampaignAdd"
import CampaignEdit from "./components/CampaignEdit"

// import world components
import WorldAdd from "./components/WorldAdd"
import WorldEdit from "./components/WorldEdit"

// import character components
import CharAdd from "./components/CharAdd"
import CharEdit from "./components/CharEdit"

// import country components
import CountryAdd from "./components/CountryAdd"
import CountryEdit from "./components/CountryEdit"

import "./App.css"


function App() {
  return (
    <div className="App">
      <Switch>

        <Route path="/campaign/:id/countries/:countryId/edit-country">
          <CountryEdit />
        </Route>

        <Route path="/campaign/:id/add-country" >
          <CountryAdd />
        </Route>

        <Route path="/campaign/:id/characters/:charId/edit-char" >
          <CharEdit />
        </Route>

        <Route path="/campaign/:id/add-char" >
          <CharAdd />
        </Route>

        <Route path="/campaign/:id/worlds/:worldid/edit-world" >
          <WorldEdit />
        </Route>

        <Route path="/campaign/:id/add-world" >
          <WorldAdd />
        </Route>

        <Route path="/add-campaign/:id" >
          <CampaignAdd />
        </Route>

        <Route path="/campaign/:id/edit" >
          <CampaignEdit />
        </Route>

        <Route path="/campaign/:id" >
          <CampaignInfo />
        </Route>

        <Route path="/home/:id" >
          <Dashboard />
        </Route>

        <Route path="/register" >
          <RegisterForm />
        </Route>

        <Route exact path="/" >
          <LoginForm />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
