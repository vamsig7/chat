import React from "react";
import "./App.scss";
import { Main } from "./components/login/index";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: "",
      rememberMe: false
    };
  }
  componentDidMount() {
    this.setState({ rememberMe: localStorage.getItem("rememberMe") });
    this.setState({ userToken: localStorage.getItem("token") });
    console.log(localStorage.getItem("rememberMe"));
  }
  render() {
    if (this.state.rememberMe) {
      return <div>logged in </div>;
    } else {
      return <Main />;
    }
  }
}

export default App;
