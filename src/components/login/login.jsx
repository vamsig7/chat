import React from "react";
import loginImg from "../../logo.svg";
var rp = require("request-promise");
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      checkBox: true
    };
  }
  async handleLoginButton(event) {
    var token = await AccessToken(this.state.userName, this.state.passWord);
    if (token !== undefined && this.checkBox === true) {
      localStorage.setItem("token", this.userToken);
      localStorage.setItem("rememberMe", true);
    }
    event.persist();
  }
  handleUserName = event => {
    this.setState({ userName: event.target.value });
  };
  handlePassWord = event => {
    this.setState({ passWord: event.target.value });
  };
  handleToken = event => {};
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} alt="" />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                placeholder="username"
                onChange={this.handleUserName.bind(this)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={this.handlePassWord.bind(this)}
              />
            </div>
          </div>
        </div>
        <div className="loggedIn">
          <input
            className="checkbox"
            type="checkbox"
            defaultChecked={false}
            onChange={() => {
              this.setState({ checkBox: !this.state.checkBox });
              localStorage.setItem("rememberMe", this.state.checkBox);
            }}
          />
          <label>Keep me logged in </label>
        </div>
        <div className="footer" onClick={this.handleLoginButton.bind(this)}>
          <button type="button" className="btn">
            Login
          </button>
        </div>
      </div>
    );
  }
}
async function AccessToken(userName, passWord) {
  var options = {
    method: "POST",
    uri: "http://node-server-clc.herokuapp.com/api/v1/login",
    form: {
      username: "hello",
      password: "1234"
    }
  };
  return new Promise((resolve, reject) =>
    rp(options)
      .then(response => {
        console.log(response.status + response);
        if (response !== undefined) resolve(response);
        else reject(response);
      })
      .catch(err => {
        console.log(err);
      })
  );
}
// function handleResponse(response, username) {
//   if (response === "Username Exists") {
//     alert("Username  already exists Exists");
//   } else if (response === "Internal db error") {
//     alert("Something went wrong try again later");
//   } else {
//     alert("Successfully insertd");
//   }
// }
