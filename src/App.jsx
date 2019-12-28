import React from "react";
import "./App.scss";
import { Main } from "./components/login/index";
import Messenger from "./components/chat/Messenger";
import MessageDemo from "./components/chat/MessageDemo/messagedemo";
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
  }
  render() {
    if (this.state.rememberMe) {
      return <MessageDemo />;
    } else {
      return <Main />;
    }
  }
}

export default App;
