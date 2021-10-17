import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Prueba from "../components/Prueba";
import Home from "../components/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Dashboard />
      <Switch>
        <Route exact path="/prueba" component={Prueba} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
