import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import "./App.css";
import Navbar from "./components/navbar";
import Home from "./components/home";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Route exact path='/' component={Login} />
          <Route path='/home' component={Home} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;