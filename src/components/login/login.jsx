import React from "react";
import loginImg from "../../logo.svg";
import request from "request";
export class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      checkBox: true,
      rememberMe: true
    };
  }

  async handleLoginButton(event) {
    var token = await AccessToken(this.state.userName, this.state.passWord);
    console.log(token);
    if (token !== undefined && !this.state.checkBox === true) {
      localStorage.setItem("token", token);
      localStorage.setItem("rememberMe", true);

      this.setState({ rememberMe: false });
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
  return new Promise((resolve, reject) =>
    request(
      {
        url: "http://node-server-t.herokuapp.com/api/v1/login",
        form: {
          username: userName,
          password: passWord
        },
        method: "POST"
      },
      (err, res, body) => {
        if (err) throw err;
        else {
          var token = JSON.parse(body).token.split(" ")[1];
          resolve(token);
        }
      }
    )
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
