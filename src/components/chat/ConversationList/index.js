import React, { useState, useEffect } from "react";
import ConversationListItem from "../ConversationListItem";
import Toolbar from "../Toolbar";
import ToolbarButton from "../ToolbarButton";
import axios from "axios";
import "./ConversationList.scss";
import request from "request";

export default function ConversationList(props) {
  const [conversations, setConversations] = useState([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [searchUserName, setSearchUserName] = useState("");
  function addNewUser() {
    setShowPopUp(!showPopUp);
  }
  async function sendMessage(username) {
    request.post(
      {
        url: "http://node-server-t.herokuapp.com/api/v1/sendMessage",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        form: {
          username: username,
          message: "fisrtMessage"
        }
      },
      (err, res, body) => {
        if (err) throw err;
        else {
          var parseddata = JSON.parse(body);
          if (parseddata.status === 200) {
            var convId = parseddata.convId;
            getConversations(username, convId);
          } else if (parseddata.status === 401) alert("invalid username");
        }
      }
    );
  }
  async function searchUser(event) {
    if (event.key === "Enter") {
      var name = event.target.value;
      var body = await sendMessage(name);
    }
  }

  const getConversations = (username, convId) => {
    axios.get("https://randomuser.me/api/?results=1").then(response => {
      let newConversations = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: username,
          convId: convId
        };
      });
      setConversations([...conversations, ...newConversations]);
    });
  };

  return (
    <div>
      <div className="conversation-list">
        <Toolbar
          title="Messenger"
          leftItems={[<ToolbarButton key="cog" icon="ion-ios-cog" />]}
          rightItems={[
            <ToolbarButton key="add" icon="ion-ios-add-circle-outline" />
          ]}
        />
        <div className="footer">
          <button type="button" onClick={addNewUser}>
            New Message
          </button>
        </div>
        <div>
          {showPopUp ? (
            <div className="popup">
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  onKeyDown={e => {
                    searchUser(e);
                  }}
                />
              </div>
              <button onClick={addNewUser}>close me</button>
            </div>
          ) : null}
        </div>
        {conversations.map(conversation => (
          <ConversationListItem key={conversation.name} data={conversation} />
        ))}
      </div>
    </div>
  );
}
