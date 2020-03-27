import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Post from "./Post";

class App extends Component {
    render() {
      return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/post" component={Post}/>
            </Switch>
        </BrowserRouter>
      )
    }
}

export default App;