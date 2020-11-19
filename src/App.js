import React from "react";
import { Switch, Route } from "react-router-dom"

// import app components 
import LoginForm from "./components/LoginForm"
import RegisterForm from "./components/RegisterForm"
import Dashboard from "./components/Dashboard"
import NavBar from "./components/NavBar"

// import private routing
import PrivateRoute from "./components/PrivateRoute"

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

// styles
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import "./App.css"

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#81c784"
    },
    secondary: {
      main: "#ba68c8"
    }
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Switch>

          <PrivateRoute exact path="/campaign/:id/countries/:countryId/edit-country" component={CountryEdit} />

          <PrivateRoute exact path="/campaign/:id/add-country" component={CountryAdd} />

          <PrivateRoute exact path="/campaign/:id/characters/:charId/edit-char" component={CharEdit} />

          <PrivateRoute exact path="/campaign/:id/add-char" component={CharAdd} />

          <PrivateRoute exact path="/campaign/:id/worlds/:worldid/edit-world" component={WorldEdit} />

          <PrivateRoute exact path="/campaign/:id/add-world" component={WorldAdd} />

          <PrivateRoute exact path="/add-campaign/:id" component={CampaignAdd} />

          <PrivateRoute exact path="/campaign/:id/edit" component={CampaignEdit} />

          <PrivateRoute exact path="/campaign/:id" component={CampaignInfo} />

          <PrivateRoute exact path="/home/:id" component={Dashboard} />

          <Route path="/register" >
            <RegisterForm />
          </Route>

          <Route exact path="/" >
            <LoginForm />
          </Route>

        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
