import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Post from "./Post";

class App extends Component {
    render() {
      return (
        <BrowserRouter>
            <Switch>
                <Route
                  exact path={'/'} render={
                    props => (
                      <Home 
                        // {...props} 
                      />)
                  }
                />
                <Route path="/post" render={
                    props => (
                      <Post
                        {...props}
                      />)
                  }
                />
            </Switch>
        </BrowserRouter>
      )
    }
}

export default App;