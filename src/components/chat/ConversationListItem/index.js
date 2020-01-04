import React, { useEffect } from "react";
import shave from "shave";
import { store, collect } from "react-recollect";
import "./ConversationListItem.css";
import request from "request";
function ConversationListItem(props) {
  useEffect(() => {
    shave(".conversation-snippet", 20);
  });

  const { photo, name, convId } = props.data;
  async function setSelectedUser() {
    delete store.tasks;
    store.tasks = [];
    var body = await getMessages(convId);
  }
  async function getMessages() {
    request.get(
      {
        url: "http://node-server-t.herokuapp.com/api/v1/getMessages",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          convId: convId
        }
      },
      (err, res, body) => {
        if (err) {
          console.log("error here");
        } else {
          var message = JSON.parse(body).data.messages[0];
          console.log("this is message section" + message);
          if (message !== undefined) {
            store.tasks.push({
              id: convId,
              message: message,
              isMine: false
            });
          }
        }
      }
    );
  }

  return (
    <div className="conversation-list-item" onClick={setSelectedUser}>
      <img className="conversation-photo" src={photo} alt="conversation" />
      <div className="conversation-info">
        <h1 className="conversation-title">{name}</h1>
        <p className="conversation-snippet">{convId}</p>
      </div>
    </div>
  );
}

export default collect(ConversationListItem);
