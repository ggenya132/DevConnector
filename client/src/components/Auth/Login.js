import React, { Component } from "react";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password: "",

      errors: {}
    };
  }
  onSubmit = e => {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };
    console.log(user);
  };
  onChange = e => this.setState({ [e.target.name]: e.target.value });
  render() {
    return (
      <div className="login">
        <div Name="container">
          <div Name="row">
            <div Name="col-md-8 m-auto">
              <h1 Name="display-4 text-center">Log In</h1>
              <p Name="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
                <div Name="form-group">
                  <input
                    type="email"
                    Name="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </div>
                <div Name="form-group">
                  <input
                    type="password"
                    Name="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                </div>
                <input type="submit" Name="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
