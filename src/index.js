import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import request from "request";
import * as serviceWorker from "./serviceWorker";
import { store } from "react-recollect";

store.tasks = [
  {
    id: 1,
    meesage: "Example task!",
    isMine: false
  }
];

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
