import React from "react";
import { BrowserRouter as  Router, Route, Switch } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import JSONdata from "./Pages/JSONdata";



function App() {
  
  return (
    <>
    <div className = "header">
      <div className = "nav">
        <ul className = "navList">
          <li className = "navItem"><a href = "/">Главная</a></li>
          <li className = "navItem"><a href = "/JSONdata">JSON dataset</a></li>
        </ul>
      </div>
    </div>
    <div>
      <Router>
        <Switch>
          <Route exact path = "/" component = {MainPage} />
          <Route exact path = "/JSONdata" component = {JSONdata} />
        </Switch>
      </Router>
      </div>
    </> 
    );
}


export default App;
