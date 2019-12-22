import React from "react";
import loginImg from "../../logo.svg";
var rp = require("request-promise");
export class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: ""
    };
  }
  handleRegisterButton(event) {
    AccessToken(this.state.userName, this.state.passWord);
    console.log(this.state.userName);
    event.preventDefault();
  }
  handleUserName = event => {
    this.setState({ userName: event.target.value });
  };
  handlePassWord = event => {
    this.setState({ passWord: event.target.value });
  };
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
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
                type="text"
                name="password"
                placeholder="passowrd"
                onChange={this.handlePassWord.bind(this)}
              />
            </div>
          </div>
        </div>

        <div className="footer" onClick={this.handleRegisterButton.bind(this)}>
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}
//"http://node-server-clc.herokuapp.com/api/v1/create"
//"http://192.168.137.1:3000/api/v1/create"
function AccessToken(userName, passWord) {
  var options = {
    method: "POST",
    uri: "http://node-server-clc.herokuapp.com/api/v1/create",
    form: {
      username: userName,
      password: passWord
    }
  };
  rp(options)
    .then(response => {
      console.log(response);
      handleResponse(response, userName);
    })
    .catch(err => {
      console.log(err);
    });
}
function handleResponse(response, userName) {
  if (response === "Username Exists") {
    alert("Username  already exists Exists");
  } else if (response === "Internal db error") {
    alert("Internal error");
  } else if (
    (response = "Successfully inserted " + userName + " credentials")
  ) {
    alert("Successfully inserted");
  } else {
    alert("Check your Internet Connection");
  }
}

export default Register;
