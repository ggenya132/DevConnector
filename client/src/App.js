import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";

import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import store from "./store";

if (localStorage.jwtToken) {
  // SET auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decodedUserData = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decodedUserData));
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            {/* <Landing /> */}
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
