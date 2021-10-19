import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Home from "../components/home/Home";
import SideBar from '../components/SideBar'
import Record from "../components/Record/Record";
function App() {
  return (
    <BrowserRouter>
      <SideBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/record" component={Record} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
