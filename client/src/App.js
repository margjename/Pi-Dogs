import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import DogDetail from "./components/DogDetail";
import CreateDog from "./components/CreateDog";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dog/:id" component={DogDetail} />
          <Route exact path="/createdog" component={CreateDog} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
