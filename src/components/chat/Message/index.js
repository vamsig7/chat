import React from "react";
import moment from "moment";
import "./Message.css";
import { collect, store } from "react-recollect";

function Message(props) {
  const data = props.task.message;
  const isMine = props.task.isMine;
  console.log(data);

  return (
    <div className={["message", `${isMine ? "mine" : ""}`].join(" ")}>
      <div className="bubble-container">
        <div className="bubble">{data}</div>
      </div>
    </div>
  );
}

export default collect(Message);
