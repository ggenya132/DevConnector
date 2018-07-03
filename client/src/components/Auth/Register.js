import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password: "",
      password2: "",
      errors: {}
    };
    //some hacky stuff.
    // Redefining the context of 'this' for onChange to be able to
    // invoke the passed down function
    // of setState from the reference to the react
    // Component prototype

    // this.onChange = this.onChange.bind(this);
  }

  //alt: onChange = e => this.setState({ [e.target.name]: e.target.value })
  //this works because this in trad func scope points to containing object...since this is class
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      password: this.state.password,
      email: this.state.email,
      password2: this.state.password2
    };
    console.log(newUser);

    axios
      .post("/api/users/register", newUser)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  //   onChange(e) {
  //       this causes bugs because the context of this referring to the class is not perserved, therefore we need to bind this in the constructor
  //     this.setState({ [e.target.name]: e.target.value });
  //   }

  render() {
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Name"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
