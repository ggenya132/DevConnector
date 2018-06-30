import React, { Component } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Hello MERN</h1>
        <Navbar />
      </div>
    );
  }
}

export default App;
