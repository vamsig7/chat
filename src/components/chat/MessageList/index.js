import React from "react";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import Message from "../Message";
import { store, collect } from "react-recollect";
import request from "request";
import "./MessageList.css";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getMessages = () => {
    request.get(
      {
        url: "http://node-server-t.herokuapp.com/api/v1/getMessages",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          convId: "5e065bfedf675c0017823b9c"
        }
      },
      (err, res, body) => {
        if (err) {
          console.log("error here");
        } else {
          var message = JSON.parse(body).data.messages[0].body;
          console.log(message);
          store.tasks.push({
            id: "200",
            message: message,
            isMine: false
          });
        }
      }
    );
  };
  componentDidMount() {
    this.getMessages();
  }
  sendMessage(message) {
    request.post(
      {
        url: "http://node-server-t.herokuapp.com/api/v1/sendMessage",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        form: {
          username: 1,
          message: message
        }
      },
      (err, res, body) => {
        if (err) throw err;
        else console.log(body);
      }
    );
  }
  onKeyPressed(event) {
    if (event.key === "Enter") {
      this.sendMessage(event.target.value);
      store.tasks.push({
        id: event.target.value,
        message: event.target.value,
        isMine: true
      });
      event.target.value = "";
    }
  }
  render() {
    return (
      <div className="message-list">
        <Toolbar
          title="Conversation Title"
          rightItems={[
            <ToolbarButton
              key="info"
              icon="ion-ios-information-circle-outline"
            />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />
          ]}
        />

        {store.tasks.map(task => (
          <Message key={task.id} task={task} />
        ))}

        <div className="compose">
          <input
            type="text"
            className="compose-input"
            defaultValue={""}
            placeholder="Type a message, @name"
            onKeyDown={e => this.onKeyPressed(e)}
            tabIndex="0"
          />
        </div>
      </div>
    );
  }
}
export default collect(MessageList);
