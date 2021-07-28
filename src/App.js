import React from "react";
import { BrowserRouter as  Router, Route, Switch, IndexRoute } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import JSONdata from "./Pages/JSONdata";
import warningFunction from "./Pages/404";



function App() {
  
  return (
    <>
    <div className = "header">
      <div className = "nav">
        <ul className = "navList">
          <li className = "navItem"><a style = {{textDecoration:"none", color: "#000"}} href = "/">Главная</a></li>
          <li className = "navItem"><a style = {{textDecoration:"none", color: "#000"}} href = "/JSONdata">JSON dataset</a></li>
        </ul>
      </div>
    </div>
    <div>
      <Router>
        <Switch>
          <Route exact path = "/" component = {MainPage}/>
          <Route exact path = "/JSONdata" component = {JSONdata} />
          <Route exact path = "" component = {warningFunction} />
        </Switch>
      </Router>
      </div>
    </> 
    );
}


export default App;
